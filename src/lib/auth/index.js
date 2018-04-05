import { fbLoginPermissions } from '../../constants/index';
import firebase from '../../config/firebase';
import Auth from '../../config/auth';

export const handleFbLogin = () => (
	Auth.Facebook.login(fbLoginPermissions)
		.then((token) => {
			this.setState({
				isAuthenticated: true,
			});
			this.props.navigation.navigate('App');
			firebase.auth()
				.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(token));
		})
		.catch((err) => this.onError && this.onError(err))
);