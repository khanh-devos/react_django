from django.core.management.base import BaseCommand
import pandas as pd

from B1_orders.models import Order
from django.conf import settings

from sqlalchemy import create_engine

class Command(BaseCommand):
    help = "A command to add data from .csv into database model"
    
    def handle(self, *args, **kwargs):
        
        file = "data.csv"
        df = pd.read_csv(file)
        
        
        #config engine as default database at settings
        user = settings.DATABASES['default']['USER']
        password = settings.DATABASES['default']['PASSWORD']
        database_name = settings.DATABASES['default']['NAME']
        # host = settings.DATABASES['default']['HOST']
        # port = settings.DATABASES['default']['PORT']

        database_url = 'postgresql://{user}:{password}@localhost:5432/{database_name}'.format(
                            user=user,
                            password=password,
                            database_name=database_name,
                        )
        
        engine = create_engine(database_url, encodin, echo=True)
        
        df.to_sql(Order._meta.db_table, 
                  if_exists='append', 
                  con=engine, 
                  index=False)
        
        # Doing it like this is slow
        for index, row in df.iterrows():
            model = MyModel()
            model.field_1 = row['field_1']
            model.save()
        
        
        #print(df)