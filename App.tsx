import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { theme } from './theme';

import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileSection';
import WorkerSetupScreen from './components/WorkerSetupScreen';
import KycScreen from './components/KycScreen';
import AuthScreen from './components/AuthScreen';
import Loader from './components/Loader';
import { getItem, setItem, removeItem } from './utils/storage';
import { Home, User, HandPlatter, BriefcaseBusiness } from 'lucide-react-native';
import JobsScreen from 'components/JobsScreen';
import ServicesScreen from 'components/ServicesScreen';
import { ToastProvider } from './context/ToastContext'; // Import ToastProvider
import JobDetailsScreen from 'components/JobApplyScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BookingDetailsScreen = () => <JobsScreen />;
const ServiceDetailScreen = () => <ServicesScreen />;

export default function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleLoginSuccess = async (id: string) => {
    setUserId(id);
    await setItem('userId', id);
  };

  const handleLogout = async () => {
    setUserId(null);
    await removeItem('userId');
    await removeItem('worker_profile');
    await removeItem('access_token');
    await removeItem('user_data');
  };

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      console.log('checking userId: ', userId);

      const accessToken = await getItem('access_token');
      if (accessToken) {
        const storedUserId = await getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) return <Loader />;

  const HomeStackScreen = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen
        name="BookingDetails"
        component={BookingDetailsScreen}
        options={{ title: 'Booking Details' }}
      />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetailScreen}
        options={{ title: 'Service Detail' }}
      />
    </Stack.Navigator>
  );

  const ProfileStackScreen = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileMain">
        {(props) => <ProfileScreen {...props} onLogout={handleLogout} />}
      </Stack.Screen>
      <Stack.Screen
        name="WorkerSetup"
        component={WorkerSetupScreen}
        options={{ title: 'Worker Setup' }}
      />
      <Stack.Screen
        name="KycScreen"
        component={KycScreen}
        options={{ title: 'KYC Verification' }}
      />
      <Stack.Screen name="JobsApply" component={JobDetailsScreen} />
    </Stack.Navigator>
  );

  const MainTabs = () => (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          paddingVertical: 8,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          height: 60,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Home
              strokeWidth={focused ? 0 : 1}
              fill={focused ? theme.colors.active : 'none'}
              color={focused ? theme.colors.active : theme.colors.inactive}
              size={24}
            />
          ),
          tabBarActiveTintColor: theme.colors.active,
          tabBarInactiveTintColor: theme.colors.inactive,
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={BookingDetailsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <BriefcaseBusiness
              strokeWidth={focused ? 0 : 1}
              fill={focused ? theme.colors.active : 'none'}
              color={focused ? theme.colors.active : theme.colors.inactive}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServiceDetailScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <HandPlatter
              strokeWidth={focused ? 0 : 1}
              fill={focused ? theme.colors.active : 'none'}
              color={focused ? theme.colors.active : theme.colors.inactive}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <User
              strokeWidth={focused ? 0 : 1}
              fill={focused ? theme.colors.active : 'none'}
              color={focused ? theme.colors.active : theme.colors.inactive}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider>
        <StatusBar backgroundColor={theme.colors.surface} barStyle="dark-content" />
        <NavigationContainer>
          {!userId ? <AuthScreen onLoginSuccess={handleLoginSuccess} /> : <MainTabs />}
        </NavigationContainer>
      </ToastProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  text: { fontSize: 22, fontWeight: '600', color: theme.colors.text },
});