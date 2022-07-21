
import time

class VideosRouter:

    route_app_labels = {'D_videos'}

    def db_for_read(self, model, **hints):

        if model._meta.app_label in self.route_app_labels:
            
            for _ in range(2):
                time.sleep(1) 
                print("sleeping")
            
            return 'videosDB'
        return None

    def db_for_write(self, model, **hints):

        if model._meta.app_label in self.route_app_labels:
            return 'videosDB'
        return None

    def allow_relation(self, obj1, obj2, **hints):

        if (
            obj1._meta.app_label in self.route_app_labels or
            obj2._meta.app_label in self.route_app_labels
        ):
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):

        if app_label in self.route_app_labels:
            return db == 'videosDB'
        return None


class Cafe_DB2_Router:

    route_app_labels = {'E_videos'}

    def db_for_read(self, model, **hints):

        if model._meta.app_label in self.route_app_labels:
            
            return 'cafe_DB2'
        return None

    def db_for_write(self, model, **hints):

        if model._meta.app_label in self.route_app_labels:
            return 'cafe_DB2'
        return None

    def allow_relation(self, obj1, obj2, **hints):

        if (
            obj1._meta.app_label in self.route_app_labels or
            obj2._meta.app_label in self.route_app_labels
        ):
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):

        if app_label in self.route_app_labels:
            return db == 'cafe_DB2' 
        return None