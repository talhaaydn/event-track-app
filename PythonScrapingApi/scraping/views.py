# Django
from django.http import JsonResponse

import os

# Selenium
from selenium import webdriver
import os
import time

def getOnlyUrlField(attribute):
    # attribute = "window.location='/etkinlik/ZE871/TURKIYE/tr'"
    url = attribute.split('=')[1]
    url = url.replace("'", "")[1:]  

    if url.split("/")[0] != "etkinlik":
        return "empty"

    return url

def scrap(request, keyword):

    chromeDriverPath = '/Users/talha/Desktop/hobby-system/PythonScrapingApi/chromedriver';
    driver = webdriver.Chrome(chromeDriverPath)

    time.sleep(1)

    driver.get(f"https://www.biletix.com/search/TURKIYE/tr?searchq={keyword}#{keyword}")

    time.sleep(2)

    # Selenium ile açılan sayfa üzerindeki etkinliklerin url bilgileri toplandı.
    fullUrls = []
    events = driver.find_elements_by_css_selector(".searchLinkDiv")

    if len(events) > 1:
        for event in events:
            if event.get_attribute("onclick") != None:
                cleanedUrl = getOnlyUrlField(event.get_attribute("onclick"))

                if cleanedUrl != "empty":
                    fullUrls.append(f"https://www.biletix.com/{cleanedUrl}")

    # Alınan url adreslerine teker teker bağlanıp gerekli bilgiler toplandı.
    scrapedEvents = []
    for url in fullUrls:
        driver.get(url)
        time.sleep(3)

        try:
            title = driver.find_element_by_xpath("//*[@id='eventnameh1']/span").text
        except:
            title = ""

        try:
            imageUrl = driver.find_element_by_xpath("//*[@id='ei_header']/div[5]/link").get_attribute("content")
        except:
            imageUrl = ""
        
        try:
            date = driver.find_element_by_xpath("//*[@id='eventdatefields']/h2").get_attribute("content")
        except:
            date = ""

        try:
            place = driver.find_element_by_xpath("//*[@id='hidablelocation']/a/span[1]").text                                              
        except:
            place = ""

        try:
            city = driver.find_element_by_xpath("//*[@id='hidablelocation']/a/span[2]").text
        except:
            city = ""

        content = driver.find_element_by_xpath("//*[@id='event_info']/div/div/div[1]/div[2]").text

        event = {
            'title' : title,
            'page_url' : url,
            'image_url' : imageUrl,
            'date' : date,
            'place' : place,
            'city' : city,
            'content' : content,
        }

        scrapedEvents.append(event)

    driver.quit()
    return JsonResponse(scrapedEvents, safe=False)