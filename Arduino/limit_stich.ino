
/****************************************
 * Include Libraries
 ****************************************/
#include "UbidotsESPMQTT.h"

/****************************************
 * Define Constants
 ****************************************/
#define TOKEN "BBFF-VaJYuZtN2emukUXvuOOP48qe5Lz4Op" // Your Ubidots TOKEN
#define WIFINAME "rumah" //Your SSID
#define WIFIPASS "nilala123" // Your Wifi Pass
#define DEVICE_LABEL  "demoswitch"  // Put here your Ubidots device label
#define VARIABLE_LABEL  "demo"  // Put here your Ubidots variable label 
const int relay = 5;
const int limit = 2;

Ubidots client(TOKEN);

/****************************************
 * Auxiliar Functions
 ****************************************/

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i=0;i<length;i++) {
    
    Serial.print((char)payload[i]);
    int j = (char)payload[i]; 
    if(j == '0'){
      Serial.print("hidup");
      digitalWrite(relay, LOW);
  Serial.println("Current Flowing");
  delay(3000);
      }
    else{
      Serial.print("mati");
      digitalWrite(relay, HIGH);
      Serial.println("Current not Flowing");
      delay(10000);
      }
  }
  if (digitalRead(limit) == LOW) {
     Serial.print('masuk');
     digitalWrite(relay, LOW);
  }
  Serial.println();
}

/****************************************
 * Main Functions
 ****************************************/

void setup() {
  // put your setup code here, to run once:
  pinMode(relay, OUTPUT);
  pinMode(limit,INPUT);
  client.ubidotsSetBroker("industrial.api.ubidots.com"); // Sets the broker properly for the business account
  client.setDebug(false); // Pass a true or false bool value to activate debug messages
  Serial.begin(115200);
  client.wifiConnection(WIFINAME, WIFIPASS);
  client.begin(callback);
  client.ubidotsSubscribe(DEVICE_LABEL, VARIABLE_LABEL); //Insert the dataSource and Variable's Labels
  }

void loop() {
  // put your main code here, to run repeatedly:
  if(!client.connected()){
      client.reconnect();
      client.ubidotsSubscribe(DEVICE_LABEL, VARIABLE_LABEL); //Insert the dataSource and Variable's Labels
      }

  client.loop();
  }
