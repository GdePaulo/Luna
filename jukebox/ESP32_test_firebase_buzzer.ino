#include "WiFi.h"
#include <HTTPClient.h>
#include <Arduino_JSON.h>

#include <Firebase_ESP_Client.h>
#include <Tone32.hpp>

//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

const char* ssid = "DESKTOP-49NTERP 3195";
const char* password =  "whatever1";

//const char* ssid = "TELE2-69E989_2.4G";
//const char* password =  "266F626FFEC9";

int ledPin = 2;
// Change this depending on where you put your piezo buzzer
const int TONE_OUTPUT_PIN = 4;
// The ESP32 has 16 channels which can generate 16 independent waveforms
// We'll just choose PWM channel 0 here
const int TONE_PWM_CHANNEL = 0; 
// Create our Tone32 object
Tone32 _tone32(TONE_OUTPUT_PIN, TONE_PWM_CHANNEL);
String currentSong = "none";//"loveOfMyLife";//"none";,
bool playing = false;//"none";
bool lastPlaying = false;
String lastSong = "";

// Insert Firebase project API Key
#define API_KEY "AIzaSyAHvdxY9CekXqy3j1zkDBcWoi_Al9i4ix(disney dog)"

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "https://luna-8a91a-default-rtdb.europe-west1.firebasedatabase.app"

//Define Firebase Data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
bool signupOK = false;

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastTime = 0;
// Timer set to 10 minutes (600000)
//unsigned long timerDelay = 600000;
// Set timer to 5 seconds (5000)
unsigned long timerDelay = 3500;

void setup() {
 pinMode(ledPin, OUTPUT);
 
// Serial.begin(115200);
Serial.begin(9600);
   Serial.println("Beginning connection to WiFi..");
 WiFi.begin(ssid, password);

 while (WiFi.status() != WL_CONNECTED) {
  delay(500);
  Serial.println("Connecting to WiFi..");
}
// Play connected to Wi-Fi sound
  _tone32.playNote(NOTE_C, 5, 50);

Serial.println("Connected to the WiFi network");
Serial.println(WiFi.localIP());

/* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("ok");
    signupOK = true;

    //Play authenticated to firebase sound
    _tone32.playNote(NOTE_G, 5, 50);
  }
  else {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
 
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");

  // tone(buzzerPin, 262, 250);
//  ledcAttachPin(TONE_OUTPUT_PIN, TONE_PWM_CHANNEL);
  // Plays the middle C scale
//  ledcWriteNote(TONE_PWM_CHANNEL, NOTE_C, 4);
//  delay(500);
//  ledcWriteTone(TONE_PWM_CHANNEL, 800);
//  delay(500);

//     _tone32.playNote(NOTE_C, 4, 500);
//map<int, string> sample_map { { 1, "one"}, { 2, "two" } };
//  sample_map.insert({ 4, "four" });
}
void loop() {
// digitalWrite(ledPin, HIGH);
// delay(1000);
// digitalWrite(ledPin, LOW);
// delay(1000);

  //Send an HTTP POST request every 10 minutes
  if ((millis() - lastTime) > timerDelay) {
    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
       if (Firebase.ready() && signupOK) {
      
          if (Firebase.RTDB.getBool(&fbdo, "/status/enabled")) {
            if (fbdo.dataType() == "boolean") {
              bool str = fbdo.boolData();
              Serial.println(str);
              Serial.println("I Just Received The Prior string from the endpoint");
              playing = str;
              if (!str) {
                digitalWrite(ledPin, LOW);
                
                _tone32.stopPlaying();
              } else {
                digitalWrite(ledPin, HIGH);
                lastSong = "none";
              }

             
            } else {
              Serial.println(fbdo.dataType());
              Serial.println("is a different one");
            }
            
          }
          else {
            Serial.println(fbdo.errorReason());
          }

          if (Firebase.RTDB.getString(&fbdo, "/status/currentSong")) {
             if (fbdo.dataType() == "string") {
                String str = fbdo.stringData();
                currentSong = str;
             }
          }
          
//          String currentSongPath = "/savieSongsFreq/" + currentSong;
          String currentSongPath = "/savieSongs/happy";
          // "/savieSongsFreq/happyBirthday
//          if (lastSong != currentSong && playing == "true") {
          if (playing) {
            
            if (Firebase.RTDB.getString(&fbdo, currentSongPath)) {
            if (fbdo.dataType() == "string") {
              lastPlaying = true;
              lastSong = currentSong;
              String badStr = fbdo.stringData();
              int strLen = badStr.length() + 1;
              char str[strLen];
              // Copy to avoid overwriting when splitting
              badStr.toCharArray(str, strLen);
              Serial.println(str);
            
              char *pch, *pos1;
              printf ("Splitting string \"%s\" into tokens:\n",str);
              pch = strtok_r (str,",", &pos1);
              while (pch != NULL)
              {
                printf ("pch:%s\n",pch);
                
                char item [30];
                char * note;
                int oct, dur;
                strncpy(item, pch, 30);
                printf ("Parsing notes for %s ...\n", pch);
                parseNote(item, note, oct, dur);
//                parseNoteFreq(item, oct, dur);
                pch = strtok_r (NULL, ", ", &pos1);
              }
              
//              if (str == "on") {
//                digitalWrite(ledPin, HIGH);
//                _tone32.playNote(NOTE_C, 5, 200);
//                delay(200);
//                _tone32.playNote(NOTE_G, 5, 200);
//              } else {
//                digitalWrite(ledPin, LOW);
//              }
            }
          }
          else {
            Serial.println(fbdo.errorReason());
          }
          }else{
            Serial.printf("Song hasn't changed. Last song: %s Current song: %s \n", lastSong, currentSong);
          }
        }
//       if (Firebase.RTDB.setString(&fbdo, "/test", "here whohoo")){
//          Serial.println("PASSED");
//          Serial.println("PATH: " + fbdo.dataPath());
//          Serial.println("TYPE: " + fbdo.dataType());
//        }
//        else {
//          Serial.println("FAILED");
//          Serial.println("REASON: " + fbdo.errorReason());
//        }
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
   if(playing) {
   _tone32.update();
   } else {
    _tone32.stopPlaying();
   }
}

void parseNote(char* str, char*& c, int& oct, int& dur)
{
    char *pos;
    c = strtok_r(str, "-", &pos);
    oct = atoi(strtok_r(NULL, "-", &pos));
    dur = atoi(strtok_r(NULL, "-", &pos));

    note_t note = NOTE_MAX;
    if(!strcmp(c,"A"))
      note = NOTE_A;
    else if(!strcmp(c,"Bb"))
      note = NOTE_Bb;
    else if(!strcmp(c,"B"))
      note = NOTE_B;
    else if(!strcmp(c,"C"))
      note = NOTE_C;
    else if(!strcmp(c,"Cs"))
      note = NOTE_Cs;
    else if(!strcmp(c,"D"))
      note = NOTE_D;
    else if(!strcmp(c,"E"))
      note = NOTE_E;
    else if(!strcmp(c,"Eb"))
      note = NOTE_Eb;
    else if(!strcmp(c,"F"))
      note = NOTE_F;
    else if(!strcmp(c,"Fs"))
      note = NOTE_Fs;
    else if(!strcmp(c,"G"))
      note = NOTE_G;
    else if(!strcmp(c,"Gs"))
      note = NOTE_Gs;
    //Serial.println(note);

    if(oct != 42)
//      _tone32.playNote(note, oct, dur);  
      _tone32.playNote(note, oct, dur);
    else
      _tone32.stopPlaying();
//     _tone32.stopPlaying();
     delay(dur);
    
    printf ("note: %s | oct: %d | dur: %d | time: %lu ",c, oct, dur, millis());
}

void parseNoteFreq(char* str, int& freq, int& dur)
{
    char *pos;
    freq = atoi(strtok_r(str, "-", &pos));
    dur = atoi(strtok_r(NULL, "-", &pos));

//    if(oct != 42)-Line
//      _tone32.playNote(note, oct, dur);  
      _tone32.playTone(freq, dur);
//    else
//      _tone32.stopPlaying();
//     _tone32.stopPlaying();
     delay(dur);
    
   printf ("note: %s %d %d %lu ", str, freq, dur, millis());
}