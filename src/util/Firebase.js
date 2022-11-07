import * as firebase from 'firebase'

export class Firebase {

    constructor() {

        this.init();

    }

    init(){

        if (!window._initializedFirebase) {

            firebase.initializeApp({
                apiKey: "AIzaSyAv5t-irXixPGTmp7Uuy2p9b4V3d_3K4Z4",
                authDomain: "zap-clone-d4178.firebaseapp.com",
                projectId: "zap-clone-d4178",
                storageBucket: "zap-clone-d4178.appspot.com",
                messagingSenderId: "1001028661724",
                appId: "1:1001028661724:web:da076fa7f511c71c961f19",
                measurementId: "G-SEMKWGKGF0"
            });

            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            window._initializedFirebase = true;

        }

    }

    initAuth(){

        return new Promise((resolve, reject)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function (result) {

                let token = result.credential.accessToken;
                let user = result.user;

                resolve(user, token);

            }).catch(function (error) {

                reject(error);

            });

        });        

    }

    static db(){

        return firebase.firestore();

    }

    static hd() {

        return firebase.storage();

    }

}