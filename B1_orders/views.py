from django.shortcuts import render, HttpResponse
from rest_framework import viewsets, permissions, generics, mixins, serializers, status

from . import models as mod
from . import seris

from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django_pandas.io import read_frame
from .models import date

from django.contrib.auth.models import User

import threading
import concurrent.futures
import json
from datetime import date as Date

# Create your views here.


class OrderViewSet(viewsets.ModelViewSet):
    #queryset = mod.Order.objects.all()
    serializer_class = seris.OrderSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        return self.request.user.sales.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class FinalOrderSet(generics.RetrieveAPIView):
    queryset = mod.Order.objects.all()
    serializer_class = seris.OrderSerializer

    def get_object(self):

        # ors = mod.Order.objects.all().values('created_year',
        #                                      'created_month',
        #                                      'created_date',
        #                                      'quantity',
        #                                      'type', 'name'
        #                                      )
        # df = read_frame(ors)
        # df1 = df.groupby(by = ['created_date']).agg({'quantity': 'sum'}).to_json()

        # print(df1)

        return mod.Order.objects.order_by("id").last()


@api_view(['GET'])
def sortOrders(request, number=10, *args, **kwargs):

    if request.method == "GET":
        if request.user.is_authenticated:
            orders = mod.Order.objects.order_by("id").all()

            sorted_orders = orders[
                max(0, len(orders)-number):]

            serialized_orders = seris.OrderSerializer(sorted_orders, many=True)

            # return JsonResponse(seris.data, safe=False)
            return Response(serialized_orders.data)
        else:
            return Response({"error": "no authorization"})


# FOR PLOTTING, WE NEED 2 VAR: YEAR AND MONTH
# --how many days in a month
def countDays(year, month):
    if month+1 > 12:
        return (Date(year+1, 1, 1) - Date(year, month, 1)).days
    else:
        return (Date(year, month+1, 1) - Date(year, month, 1)).days


def buildEmptyResult(year, month):
    ######################################
    #--- build a frame of each Type, each day quantity is zero ---#
    # result = [{
    #     'name': 'Coffee',
    #     'data': [
    #         {'date': '01', 'quantity': 0},
    #         ...,
    #         {'date': '28', 'quantity': 0}
    #     ]
    # }]

    days_in_month = range(1, 1 + countDays(int(year), int(month)))

    data = list(map(lambda a: {'date': '0'+str(a) if a < 10 else str(a),
                               'quantity': 0}, days_in_month))

    Types = ['Coffee', 'MilkTea', 'Juice', 'Food', 'Other']
    result = map(lambda a: {'name': a, 'total': 0, 'data': data}, Types)

    return list(result)


def extractSaleDate(df1, date):
    # 3
    #---only SOLD DATE AND only SOLD BEVERAGE----#
    sold_types = df1.index

    sold_res = []

    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        executor.map(lambda item: sold_res.append({'name': item,
                                                   'total': sum(df1.loc[item].to_list()),
                                                   'data': df1.loc[item].to_list()}), sold_types)

    # print(sold_res)
    return sold_res


class Result:
    def __init__(self, result):
        self.result = result
        self._lock = threading.Lock()

    def getResult(self):
        return self.result

    def assignByIndex(self, a, data1, date):
        if a.get('date') not in date:
            return a
        else:
            return {
                'date': a.get('date'),
                'quantity': data1[date.index(a.get('date'))]
            }

    def extractQuantity(self, tuple1):
        (item1, data1, date, res1) = tuple1

        for i, item2 in enumerate(res1):
            if item2.get('name') == item1.get('name'):

                m1 = map(lambda a: self.assignByIndex(
                    a, data1, date), item2.get('data'))

                # print(item1.get('name'))
                # print(list(m1))
                with self._lock:
                    self.result[i].update({
                        'total': item1.get('total'),
                        'data': list(m1)
                    })


#--find out Data for plotting--#
def find_monthly_plotting_data(monthly_sales, year, month):
    df = read_frame(monthly_sales)

    # WE NEED TO INSERT ID FOR REACT REQUIREMENT
    df1 = df.groupby(by=['type', 'created_date'],
                     as_index=True).agg({'quantity': 'sum'})
    df1 = df1.unstack(fill_value=0)

    # Date that has orders or sales
    date = list(map(lambda item: item[1], df1.columns.values))
    # print(date)

    # sold_res = [
    #     {'name': 'Coffee', data: [1, 2, 4]},   => quanity each day in date
    #     {'name': 'Juice', data: [5, 6, 7]}     => this case means only 3 days has sales
    # ]
    sold_res = extractSaleDate(df1, date)
    # print(sold_res)

    #--empty result with all quantity is zero--#
    result = buildEmptyResult(year, month)

    #######################################
    #---ADD REAL QUANTITY INTO RESULT--#
    res1 = result.copy()
    obj1 = Result(result)

    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        for item1 in sold_res:
            data1 = item1.get('data')
            executor.submit(obj1.extractQuantity, (item1, data1, date, res1))

    res = obj1.getResult()

    # print(res[0])
    return res


# calculate quantity per name
def calculate_Name_Quantity(monthly_sales):
    df = read_frame(monthly_sales)

    # WE NEED TO INSERT ID FOR REACT REQUIREMENT
    df1 = df.groupby(by=['name', 'type'],
                     as_index=True).agg({'quantity': 'sum'}).reset_index()

    # capitalize all the columns names
    df1.rename(columns={'name': 'NAME',
                        'type': 'TYPE',
                        'quantity': 'QUANTITY'
                        }, inplace=True)

    return df1.to_html(table_id='sales-per-name-table-ID',
                       bold_rows=False,
                       justify="center",
                       escape=False
                       )


@api_view(['GET'])
def plotting(request, year=date.strftime("%Y"), month='10', *args, **kwargs):

    if request.method == "GET":
        if request.user.is_authenticated:

            if len(month) == 1:
                month = '0'+month

            # Error if no data in that month
            if not mod.Order.objects.filter(
                    created_year__contains=year,
                    created_month__contains=month).exists():

                return Response({
                    "plottingErr": f"This month '{month}/{year}' has no data..."
                }, status=status.HTTP_400_BAD_REQUEST)

            monthly_sales = mod.Order.objects.filter(
                created_year__contains=year,
                created_month__contains=month
            )

            res = find_monthly_plotting_data(
                monthly_sales, int(year), int(month))

            # Add last day of this month
            last_day = countDays(int(year), int(month))
            print(last_day, " last_day of ", month)

            # Calculare quantity per name
            quant_per_name_table = calculate_Name_Quantity(monthly_sales)
            # print(quant_per_name_table)

            result = {
                "typesData": res,
                'sales_per_name': quant_per_name_table,
                "last_day": last_day
            }

            return Response(json.dumps(result))

        else:
            return Response({"error": "no authorization"})
