import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useGetAllUsers} from '../../(auth)/data/index.js'
import UserDisplay from '../../../components/ui/UserDisplay.jsx';


export default function HomeScreen() {
  const data = useGetAllUsers()
  const response = data.data
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to Kibutha FC</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>News</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Matches</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Schedules</Text>
        </TouchableOpacity>
      </View>

      {/* Updates Section */}
      <ScrollView style={styles.updates}>
        <Text style={styles.sectionTitle}>Latest Updates</Text>
       <UserDisplay data={response}/>
     
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1a18',
  },
  header: {
    backgroundColor: '#dbd80f',
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  actionButton: {
    backgroundColor: '#dbd80f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  updates: {
    flex: 1,
    paddingHorizontal: 5,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  updateCard: {
    backgroundColor: '#db530f',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  updateText: {
    fontSize: 14,
    color: '#fff',
  },
});
