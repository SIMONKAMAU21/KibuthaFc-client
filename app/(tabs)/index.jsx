import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
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
        <View style={styles.updateCard}>
          <Text style={styles.updateText}>Match: Kibutha FC vs Rivals - Jan 30, 2025</Text>
        </View>
        <View style={styles.updateCard}>
          <Text style={styles.updateText}>New Training Schedule Updated!</Text>
        </View>
        <View style={styles.updateCard}>
          <Text style={styles.updateText}>Team News: Simon Kamau Joins as Forward.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ooo',
  },
  header: {
    backgroundColor: '#007bff',
    padding: 20,
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
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  updates: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  updateCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  updateText: {
    fontSize: 14,
    color: '#333',
  },
});
