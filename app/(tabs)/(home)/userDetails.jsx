import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { router, useLocalSearchParams } from 'expo-router';
import CustomButton from '../../../components/customButton';
import Inputs from '../../../components/customInput';
import { useUpdateUser } from '../../(auth)/data';
import { Dropdown } from '../../../components/dropDown';
import * as ImagePicker from "expo-image-picker";

const UserDetails = () => {
  const { user } = useLocalSearchParams();
  const parsedUser = user ? JSON.parse(user) : {};
  const [form, setForm] = useState({})

  const [formData, setFormData] = useState({
    name: parsedUser?.name,
    id: parsedUser?._id, // Ensure ID is included
    email: parsedUser?.email,
    phone: parsedUser?.phone,
    role: parsedUser?.role,
  });
  const updateUserMutation = useUpdateUser()
  // Function to select an image

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, photo: result.assets[0].uri });
    }
  };

  // const handleUpdate = () => {
  //   updateUserMutation.mutate(formData, {
  //     onSuccess: (data) => {
  //       console.log("user updated succefully", data)
  //       setFormData((prev) => ({
  //         ...prev,
  //         ...data
  //       }))
  //       Toast.show({
  //         type: "success",
  //         text1: "success",
  //         text2: data.message || "user updated"
  //       })
  //       router.push('/(home)')
  //     },
  //     onError: (error) => {
  //       console.log("error", error)
  //     }
  //   })
  //   console.log('Updated User:', formData);
  // };
  const handleUpdate = () => {
    const updatePayload = { ...formData };
  
    // Include the selected image if available
    if (form.photo) {
      updatePayload.photo = form.photo;
    }
  
    updateUserMutation.mutate(updatePayload, {
      onSuccess: (data) => {
        console.log("User updated successfully", data);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: data.message || "User updated",
        });
        router.push("/(home)");
      },
      onError: (error) => {
        console.error("Error updating user", error);
      },
    });
  };
  
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {form.photo && form.photo ? (
          <Image source={{ uri: form.photo }} style={styles.profileImage}
          />
        ) : <Image
          source={{ uri: parsedUser?.photo || parsedUser.photoUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s' }}
          style={styles.profileImage}
        />}

        {/* Image Picker Button */}
        <TouchableOpacity onPress={pickImage} style={{ marginTop: 20, padding: 10, backgroundColor: "#1DB954", borderRadius: 5 }}>
          <Text style={{ color: "white", textAlign: "center" }}>Upload Profile Picture</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Update User Details</Text>
        {/* <Text style={styles.title}>{formData?.id}</Text> */}

        <Inputs
          // style={styles.input}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Name"
        />
        <Inputs
          // style={styles.input}
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          placeholder="Email"
          keyboardType="email-address"
        />
        <Inputs
          // style={styles.input}
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          placeholder="Phone"
          keyboardType="phone-pad"
        />
        {/* <Inputs
          // style={styles.input}
          value={formData.role}
          onChangeText={(text) => setFormData({ ...formData, role: text })}
          placeholder="Role"
        /> */}
        <Dropdown
          label=""
          name="Role"
          options={[
            { label: 'Admin', value: "admin" },
            { label: 'Prayer', value: "prayer" },
            { label: 'Fun', value: "fun" }
          ]}
          width="100%"
          placeholder="Select Role"
          onValueChange={(option) => setFormData({ ...formData, role: option?.value })} // ✅ Update role state
          containerStyle={{
            backgroundColor: "#202C33",
            width: "100%",
            position: "absolute",
            borderWidth: 1,
            borderColor: "red",
            color: "white",
          }}
        />
        <CustomButton containerStyles={{ marginTop: 10 }}
          title="Update User" handlePress={handleUpdate} />
      </View>
    </SafeAreaView>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1c1a18',
  },
  card: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: "white"
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
});
