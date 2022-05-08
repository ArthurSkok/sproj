#include <SoftwareSerial.h> 
#include <TinyGPSPlus.h> 

#include "DHT.h"

#define DHTPIN 2     // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11   // DHT 11

DHT dht(DHTPIN, DHTTYPE);

//float lat = 28.5458,lon = 77.1703; // create variable for latitude and longitude object  
SoftwareSerial swSerial(A8,A9);//rx,tx 
TinyGPSPlus gps; // create gps object 
void setup(){ 
  Serial.begin(9600); // connect serial 
  //Serial.println("The GPS Received Signal:"); 
  swSerial.begin(9600); // connect gps sensor 
  dht.begin();
} 

void loop(){
  // This sketch displays information every time a new sentence is correctly encoded.
  handleDHT11();
  if (swSerial.available() > 0){
      gps.encode(swSerial.read());
      if (gps.location.isUpdated()){
        char buffer1[9];
        char buffer2[10];
        char packet[20];
        double lat1 = (gps.location.lat());
        double long1 = (gps.location.lng());
        dtostrf(lat1, 8, 5, buffer1);
        dtostrf(long1, 8, 5, buffer2);

        sprintf(packet, "%s,%s", buffer1,buffer2);
        //String Packet = latstr + ',' + longstr; 
        //Serial.println("Latitude= "); 
        //Serial.print(lat1);
        //Serial.print(" Longitude= "); 
        Serial.println(packet);
        //swSerial.write(lat1);
        swSerial.write(packet);
      }
  }
  
}

void handleDHT11(){
   static unsigned long lastDHTReading = 0;
   if (millis()-lastDHTReading > 2000){
    lastDHTReading = millis();
    ReadDHT();
  }
}

void ReadDHT(){
  char buffert1[8];
  char buffert2[8];
  char packett[16];
  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);
  if (isnan(h) ||  isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
  dtostrf(h, 6, 2, buffert1);
  dtostrf(f, 6, 2, buffert2);
  sprintf(packett, "1,%s,%s", buffert1,buffert2);
  // Check if any reads failed and exit early (to try again).

  swSerial.print(packett);
  Serial.println(packett);
 
  // remove until here .........................
}
