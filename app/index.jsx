import { router } from 'expo-router';
import { StyleSheet, Image, Platform, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/customButton';
import { useEffect } from 'react';
import { tokenValidation } from '../constants/userValidation';

export default function LandingPage() {
  useEffect(() => {
    const checkUserSession = async () => {
      const isValid = await tokenValidation()
      if (isValid) {
        router.replace("/(tabs)"); // Navigate to the home screen
      } else {
        router.replace("/signin"); // Navigate to the login screen
      }
    };
    checkUserSession()
  }, [])
  const goHome = () => {
    router.push('/signin');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Welcome to Kibutha FC</Text>
        <Text style={styles.subtitle}>Your Football Club, Anytime, Anywhere</Text>
      </View>

      <Image
        source={{ uri: 'https://via.placeholder.com/300x150.png?text=Kibutha+FC+Logo' }}
        style={styles.logo}
      />
     
      <TouchableOpacity style={styles.button} onPress={goHome}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/about')}>
        <Text style={styles.secondaryButtonText}>Learn More</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 40,
    borderWidth: 1
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: '600',
  },
});
