int swPin[] = {3,4,5,6,7};    

void setup(){
  Serial.begin(9600);
  for(int i=0;i<sizeof(swPin)/sizeof(int);i++){
    pinMode(swPin[i], INPUT);
  }
}

char trans[20]; // Array fro sending number(or string)

void loop(){
 for(int i=0;i<sizeof(swPin)/sizeof(int);i++){
    if(digitalRead(swPin[i]) == HIGH){
      memset(trans, 0, 20);
      char *json = &trans[0];
      char *message[] = {"\"play\"","\"pause\"","\"stop\"","\"up\"","\"down\""};
      sprintf(json, "{\"cmd\":%s}",message[i]);
      Serial.println(json);
      delay(50);
    }
  }
}
