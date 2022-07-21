from django.test import TestCase

from B1_orders import views as V 


# Create your tests here.
class TestViewFunc(TestCase):
    def test_countDays(self):
        result = V.countDays(2022, 1)
        self.assertEqual(result, 31, "should be 31")
        
        result = V.countDays(2022, 12)
        self.assertEqual(result, 31, "should be 31")
    
    def testEmptyResult(self):
        Types = ['Coffee', 'MilkTea', 'Juice', 'Food', 'Other']
        empRes = V.buildEmptyResult(2022, 1)
        
        # test name
        for i, e in enumerate(empRes):
            self.assertEqual(e.get('name'), Types[i])
    
        # test date and quantity
        last_day = V.countDays(2022, 1)
        
        for j in range(4):
            for i, e in enumerate(empRes[j].get('data')):
                self.assertLessEqual( int(e.get('date')), last_day)
                self.assertEqual(e.get('quantity'), 0)
        
    
    def test_Result(self):
        result = V.buildEmptyResult(2022, 1)
        
        obj1 = V.Result(result)
        
        #test assignByIndex
        date =  ['01', '05', '10']
        data1 = [ 2,    5,    10]
        
        a1 = {'date': '02', 'quantity': 0}   
        res1 = obj1.assignByIndex(a1, data1, date)
        self.assertDictEqual(res1, a1)
        
        a2 = {'date': '05', 'quantity': 0}   
        a3 = {'date': '05', 'quantity': 5}   
        res2 = obj1.assignByIndex(a2, data1, date)
        self.assertDictEqual(res2, a3)
        
        #test extractQuantity
        item1 = {
            'name': 'Coffee',
            'data': [2, 5, 10]
        }
        
        res1 = result.copy()
        data1 = item1.get('data')
        
        tuple1 = (item1, data1, date, res1)
        obj1.extractQuantity(tuple1)
        res = obj1.getResult()
        
        #check length
        self.assertEqual(len(res), 5)
        
        #check name
        Types = ['Coffee', 'MilkTea', 'Juice', 'Food', 'Other']
        for i,t in enumerate(Types):
            self.assertEqual(res[i].get('name'), t)
        
        #check item 'Coffee' in res
        for e in res[0].get('data'):
            if e.get('date') == '01': self.assertEqual(e.get('quantity'), 2)
            elif e.get('date') == '05': self.assertEqual(e.get('quantity'), 5)
            elif e.get('date') == '10': self.assertEqual(e.get('quantity'), 10)
            else: self.assertEqual(e.get('quantity'), 0)
        
        #check other types on res: always 0
        for e in res[1].get('data'):
            self.assertEqual(e.get('quantity'), 0)
        