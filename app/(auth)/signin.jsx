import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image, ToastAndroid } from "react-native";
import Inputs from "../../components/customInput";
import CustomButton from "../../components/customButton";
import { useLoginUser } from "./data";
import * as SecureStore from 'expo-secure-store';

const Signin = () => {
  // const { setUser, setIsLogged } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "simon kamau",
    password: "demo123",
  });
  const {mutateAsync : mutateLoginUser} = useLoginUser()

const handleLogin =(data)=>{
  const payload={
    name:form.name,
    password:form.password
  }
  setLoading(true)

  try {

    mutateLoginUser(payload,{
      onSuccess: async (data) => {
        const {token,user}=data
        await SecureStore.setItemAsync('userToken',token)
        await SecureStore.setItemAsync('user',JSON.stringify(user))

        const tokenPayload = JSON.parse(atob(token.split('.')[1]))
        const tokenExpiry = tokenPayload.exp * 1000
        await SecureStore.setItemAsync('tokenExpiry',tokenExpiry.toString())
        router.replace('/(tabs)')
        console.log(data)
      },
      onError:(error)=>{
        console.log(error)
      }
    });
    console.log('payload', payload);
  } catch (error) {
    console.error("failed to login",error)
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView>
        <View
          style={{
            minHeight: Dimensions.get("window").height - 100,
            flex: 1,
            justifyContent: "center",
            height: "100%",
            padding: 20,
            marginTop: 20,
          }}
        >
          {/* <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          /> */}

          <Text style={{fontWeight:"bold" }} className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Kibutha fc
          </Text>

          <Inputs
            label="name"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles={{ marginTop: 7 }}
            // keyboardType="name-address"
          />

          <Inputs
            label="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={{ marginTop: 7 }}
            secureTextEntry
          />

          <CustomButton
            title={loading ? "sign in ...." :"Sign In"}
            handlePress={handleLogin}
            isLoading={loading}
            containerStyles={{ marginTop: 10 }}
            disabled={loading}
            textStyles='text-black font-pbold'
          />

          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
            <Text style={{ color: "white" }} >
              Don't have an account?
            </Text>
            <Link
              href="/signup"
              className="text-lg font-psemibold text-secondary"
              style={{ marginLeft: 5,color:"green",fontWeight:"bold" }}
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;