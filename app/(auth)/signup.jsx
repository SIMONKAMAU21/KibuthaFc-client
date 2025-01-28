import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { images } from "../../constants";
// import Inputs from "../../components/InputFields";
// import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import Inputs from "../../components/customInput";
import CustomButton from "../../components/customButton";
import { useCreateAccount } from "./data";

const SignUp = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        photo: "",
    })
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [submitting, setSubmitting] = useState(false);

    const validateForm = () => {
        let valid = true;
        let newErrors = { name: "", password: "", confirmPassword: "", email: "" };

        if (!form.name) {
            newErrors.name = "name is required";
            valid = false;
        }
        if (!form.email) {
            newErrors.email = "Email is required";
            valid = false;
        }
        if (!form.password) {
            newErrors.password = "Password is required";
            valid = false;
        }
        if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const { mutateAsync: mutateCreateUser } = useCreateAccount()

    const handleCreateAccount = (data) => {
        if (!validateForm()) return;
        const payload = {
            name: form.name,
            email: form.email,
            password: form.password,
            phone: form.phone,
            photo: form.photo,
        }
        try {
            setSubmitting(true)
            mutateCreateUser(payload, {
                onSuccess: (data) => {
                    console.log(data)
                    router.replace('/signin')
                },
                onError: () => {
                    setSubmitting(false)
                }
            })
            console.log(payload)
        } catch (error) {
            console.error("failed to login", error)
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, color: "white", backgroundColor: "#000" }}>
            <ScrollView>
                <View style={{ backgroundColor: "#000", padding: 20 }}>
                    {/* <Image
                        source={images.logo}
                        className="w-[115px] h-[35px]"
                        resizeMode="contain"
                    /> */}
                    <Text style={{ fontWeight: "600", color: "white" }} >Sign up</Text>
                    <Inputs
                        label="Username"
                        value={form.name}
                        handleChangeText={(e) => setForm({ ...form, name: e })}
                        otherStyles={{ marginTop: "5%" }}
                    />
                    {errors.name ? (
                        <Text style={{ color: "red", marginTop: 2 }}>{errors.name}</Text>
                    ) : null}
                    <Inputs
                        label="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles={{ marginTop: "5%" }}
                        keyboardType="email-address"
                    />
                    {errors.email ? (
                        <Text style={{ color: "red", marginTop: 2 }}>{errors.email}</Text>
                    ) : null}
                    <Inputs
                        label="Phone"
                        value={form.phone}
                        handleChangeText={(e) => setForm({ ...form, phone: e })}
                        otherStyles={{ marginTop: "5%" }}
                        secureTextEntry
                    />
                    <Inputs
                        label="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles={{ marginTop: "5%" }}
                        secureTextEntry
                    />
                    {errors.password ? (
                        <Text style={{ color: "red", marginTop: 2 }}>{errors.password}</Text>
                    ) : null}
                    <Inputs
                        label="Confirm Password"
                        value={form.confirmPassword}
                        handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
                        otherStyles={{ marginTop: "5%" }}
                        secureTextEntry
                    />
                    {errors.confirmPassword ? (
                        <Text style={{ color: "red", marginTop: 2 }} >{errors.confirmPassword}</Text>
                    ) : null}
                    <CustomButton
                        title={submitting ? "Submitting...." : "Sign up"}
                        containerStyles={{ marginTop: "20%" }}
                        isLoading={submitting}
                        // handlePress={submit}
                        handlePress={handleCreateAccount}
                        disabled={submitting}
                        textStyles='text-black font-pbold'
                    />
                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                        <Text style={{ color: "white" }}>
                            Already have an account?
                        </Text>
                        <Link href='/signin' style={{ color: "green", fontWeight: "bold" }}>Login</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;