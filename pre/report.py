
import urllib.parse
import requests
import config
import random
import datetime
import pytz



def fetchReports(date, chosenCrimeName, limit=15):
    
    dateStr = date.strftime('%Y-%m-%d')
    order_by = "HOUR"
    query_date_str = f"REPORT_DATE_EST >= date '{dateStr} 00:00:00' and REPORT_DATE_EST < date '{dateStr} 11:59:59'"
    print(">>>>",query_date_str)
    whereStatementUrlified = urllib.parse.quote_plus(query_date_str)
    url = f'https://services.arcgis.com/S9th0jAJ7bqgIRjw/ArcGIS/rest/services/YTD_CRIME_WM/FeatureServer/0/query?where={whereStatementUrlified}&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields={order_by}&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token='    
    print("URL:",url)
    resp = requests.get(url)
    
    if resp.status_code != 200:
        raise Exception("Failed",resp.text)
    
    reports_raw = resp.json()
    features_raw = filter_raw_report(reports_raw, chosenCrimeName)
    features_raw = limit_count(features_raw, random.randrange(limit,limit+8,1))
    
    
    print(">>",len(features_raw))
    
    return [{
        'x':r["geometry"]['x'],
        'y':r["geometry"]['y'],
        'hour':r["attributes"]["HOUR"],
        'neighborhood':remove_between_chars(r["attributes"]["NEIGHBOURHOOD_158"]),
        'crimeType':r["attributes"]["CRIME_TYPE"],
        'locationType':r["attributes"]["LOCATION_CATEGORY"], 
        'reportDate':convert_timestamp(r["attributes"]["REPORT_DATE_EST"]/1000), 
        'occurDate':convert_timestamp(r["attributes"]["OCC_DATE_EST"]/1000), 
    } for r in features_raw]


def convert_timestamp(timestamp):
    dt_object = datetime.datetime.fromtimestamp(timestamp, pytz.timezone('US/Eastern'))
    return dt_object.strftime("%Y-%m-%d")


def filter_raw_report(raw_reports, chosenCrimeName):
    n = []
    for report in raw_reports['features']:
        if not report.get("geometry"):
            continue
        if not (report["attributes"]["CRIME_TYPE"] in config.ChosenCrimeTypes[chosenCrimeName]["crimeTypes"].values()):
            continue
        n.append(report)
    return n


def remove_between_chars(string):
    result = ""
    flag = False   # True when between "(" and ")"
    
    for char in string:
        if char == "(":
            flag = True
        elif char == ")":
            flag = False
        elif not flag:
            result += char
            
    return result

def limit_count(list, limit):
    while len(list) > limit:
        index_to_remove = random.randint(0, len(list) - 1)
        list.pop(index_to_remove)
    return list