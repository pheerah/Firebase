import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { StackNavigator } from 'react-navigation';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView
} from 'react-native';
import App from './App';
import Icon from 'react-native-vector-icons/FontAwesome';
import Container from './Container';
import Button from './Button';
import Label from './Label';
import { fbLoginPermissions } from './src/constants/index';
import Auth from './src/config/auth';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            email: '',
            password: ''
        };
    }
    componentDidMount() {
        // firebase.auth().signInAnonymously()
        //   .then(() => {
        //     this.setState({
        //       isAuthenticated: true,
        //     });
        //   });
        
        const email = 'aaa@xxx.com';
        const password = '123456';
        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({
                    isAuthenticated: true,
                });
            });

    }
    navigate () {
        this.textEmail.clear();
        this.textPass.clear();
    }
    press() {
        const email = this.state.email;
        const password = this.state.password;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({
                    isAuthenticated: true,
                });
                this.props.navigation.navigate('App');
            });
        
    }
    handleFbLogin() {
		
        Auth.Facebook.login(fbLoginPermissions)
            .then((token) => {
                this.setState({
                    isAuthenticated: true,
                });
                this.props.navigation.navigate('App');
                firebase.auth()
                    .signInWithCredential(firebase.auth.FacebookAuthProvider.credential(token));
				
				
            })
            .catch((err) => this.onError && this.onError(err));
    }
    render() {
        // If the user has not authenticated
        if (!this.state.isAuthenticated) {
            return null;
        }
        return (
            <ScrollView style={styles.scroll}>
                <Container>
                    <Label text="Username or Email" />
                    <TextInput ref={email => { this.textEmail = email; }} onChangeText={(text) => this.setState({email: text})} style={styles.textInput}/>
                </Container>
                <Container>
                    <Label text="Password" />
                    <TextInput ref={pass => { this.textPass = pass; }} onChangeText={(text) => this.setState({password: text})}secureTextEntry={true} style={styles.textInput}/>
                </Container>
                <Container>
                    <Button 
                        styles={{button: styles.transparentButton}}
                        onPress={this.handleFbLogin.bind(this)}>
                        <View style={styles.inline}>
                            <Icon name="facebook-official" size={30} color="#3B5699" />
                            <Text style={[styles.buttonBlueText, styles.buttonBigText]}>  Connect </Text> 
                            <Text style={styles.buttonBlueText}>with Facebook</Text>
                        </View>
                    </Button>
                </Container>
                <View style={styles.footer}>
                    <Container>
                        <Button 
                            label="Sign In"
                            styles={{button: styles.primaryButton, label: styles.buttonWhiteText}} 
                            onPress={this.press.bind(this)} />
                    </Container>
                    <Container>
                        <Button 
                            label="CANCEL"
                            styles={{label: styles.buttonBlackText}} 
                            onPress={this.navigate.bind(this)} />
                    </Container>
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#E1D7D8',
        padding: 30,
        flexDirection: 'column'
    },
    label: {
        color: '#0d8898',
        fontSize: 20
    },
    alignRight: {
        alignSelf: 'flex-end'
    },
    textInput: {
        height: 80,
        fontSize: 30,
        backgroundColor: '#FFF'
    },
    transparentButton: {
        marginTop: 30,
        borderColor: '#3B5699',
        borderWidth: 2
    },
    buttonBlueText: {
        fontSize: 20,
        color: '#3B5699'
    },
    buttonBigText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    inline: {
        flexDirection: 'row'
    },
    buttonWhiteText: {
        fontSize: 20,
        color: '#FFF',
    },
    buttonBlackText: {
        fontSize: 20,
        color: '#595856'
    },
    primaryButton: {
        backgroundColor: '#34A853'
    },
    footer: {
        marginTop: 100
    }
});