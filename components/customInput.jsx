import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'

const Inputs = ({ label, placeholder, value, handleChangeText, otherStyles, secureTextEntry, ...props }) => {
  return (
    <View style={{ width: '100%', ...otherStyles }}>
      <Text style = {{marginTop:1,color:"white"}}>{label}</Text>
      <View style={{ marginTop:8}}>
        <TextInput
          label={label}
          style={{color:"white" }}
          placeholder={placeholder}
          value={value}
          
          onChangeText={handleChangeText}
          mode='outlined'
          secureTextEntry={secureTextEntry}
          {...props}
        />
      </View>
    </View>
  )
}

export default Inputs