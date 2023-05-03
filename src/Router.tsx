import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParams, AuthStackParams, MainStackParams} from './Typings/NavigationTypes';

// Auth
import AuthLogin from './Screens/Auth/Login/Login';
import AuthRegister from './Screens/Auth/Register/Register';

// Main
import MainExplore from './Screens/Main/Explore/Explore';
import MainProfile from './Screens/Main/Profile/Profile';
import MainSettings from './Screens/Main/Settings/Settings';
import MainComments from './Screens/Main/Comments/Comments';
import MainShare from './Screens/Main/Share/Share';
import MainImageViewer from './Screens/Main/ImageViewer/ImageViewer';
import MainSearch from './Screens/Main/Search/Search';

const RootStack = createNativeStackNavigator<RootStackParams>();
const AuthStack = createNativeStackNavigator<AuthStackParams>();
const MainStack = createNativeStackNavigator<MainStackParams>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login" component={AuthLogin} />
      <AuthStack.Screen name="Register" component={AuthRegister} />
    </AuthStack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName="Search" screenOptions={{headerShown: false}}>
      <MainStack.Screen name="Explore" component={MainExplore} />
      <MainStack.Screen name="Profile" component={MainProfile} />
      <MainStack.Screen name="Share" component={MainShare} />
      <MainStack.Screen name="Settings" component={MainSettings} />
      <MainStack.Screen name="Comments" component={MainComments} />
      <MainStack.Screen name="ImageViewer" component={MainImageViewer} />
      <MainStack.Screen name="Search" component={MainSearch} />
    </MainStack.Navigator>
  );
};

const Router: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="MainStack" screenOptions={{headerShown: false}}>
        <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
        <RootStack.Screen name="MainStack" component={MainStackNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
