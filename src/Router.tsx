import {Feather} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParams, AuthStackParams, MainStackParams} from './Typings/NavigationTypes';
import {FeatherIconNames} from './Typings';
import {useTheme} from './Hooks';
import {Typography} from './Styles';

// Auth
import AuthLogin from './Screens/Auth/Login/Login';
import AuthRegister from './Screens/Auth/Register/Register';

// Main
import Explore from './Screens/Main/Explore/Explore';
import Profile from './Screens/Main/Profile/Profile';
import Settings from './Screens/Main/Settings/Settings';
import Comments from './Screens/Main/Comments/Comments';
import Share from './Screens/Main/Share/Share';
import ImageViewer from './Screens/Main/ImageViewer/ImageViewer';
import Search from './Screens/Main/Search/Search';
import Notifications from './Screens/Main/Notifications/Notifications';

const tabBarIcon =
  (name: FeatherIconNames) =>
  ({color}: {color: string}) =>
    <Feather name={name} color={color} size={20} />;

const CompassIcon = tabBarIcon('compass');
const PlusSquareIcon = tabBarIcon('plus-square');
const BellIcon = tabBarIcon('bell');
const UserIcon = tabBarIcon('user');

// Navigators
const RootStack = createNativeStackNavigator<RootStackParams>();
const AuthStack = createNativeStackNavigator<AuthStackParams>();
const BottomStack = createBottomTabNavigator<MainStackParams>();
const MainStack = createNativeStackNavigator<MainStackParams>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login" component={AuthLogin} />
      <AuthStack.Screen name="Register" component={AuthRegister} />
    </AuthStack.Navigator>
  );
};

const BottomStackNavigator = () => {
  const theme = useTheme();

  return (
    <BottomStack.Navigator
      initialRouteName="Explore"
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarLabelStyle: {...Typography.medium, fontSize: 12},
        tabBarStyle: {paddingBottom: 4},
        tabBarBadgeStyle: {
          backgroundColor: theme.colors.buttonBackground,
          color: theme.colors.buttonText,
          fontSize: 10,
          lineHeight: 16,
          height: 16,
          minWidth: 16,
          borderRadius: 8,
          textAlign: 'center',
        },
      }}
    >
      <BottomStack.Screen
        name="Explore"
        component={Explore}
        options={{title: 'Explore', tabBarIcon: CompassIcon}}
      />
      <BottomStack.Screen
        name="Share"
        component={Share}
        options={{title: 'Share', tabBarIcon: PlusSquareIcon}}
      />
      <BottomStack.Screen
        name="Notifications"
        component={Notifications}
        options={{title: 'Notifications', tabBarIcon: BellIcon, tabBarBadge: '3'}}
      />
      <BottomStack.Screen
        name="Profile"
        component={Profile}
        options={{title: 'Profile', tabBarIcon: UserIcon}}
      />
    </BottomStack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName="Explore" screenOptions={{headerShown: false}}>
      <MainStack.Screen name="Explore" component={Explore} />
      <MainStack.Screen name="Profile" component={Profile} />
      <MainStack.Screen name="Share" component={Share} />
      <MainStack.Screen name="Settings" component={Settings} />
      <MainStack.Screen name="Comments" component={Comments} />
      <MainStack.Screen name="ImageViewer" component={ImageViewer} />
      <MainStack.Screen name="Search" component={Search} />
      <MainStack.Screen name="Notifications" component={Notifications} />
    </MainStack.Navigator>
  );
};

const Router: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="BottomStack" screenOptions={{headerShown: false}}>
        <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
        <RootStack.Screen name="BottomStack" component={BottomStackNavigator} />
        <RootStack.Screen name="MainStack" component={MainStackNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
