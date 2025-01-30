import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export const Dropdown = ({
    label,
    width,
    options,
    backgroundColor,
    placeholder = 'Select an option',
    onValueChange,
    containerStyle,
    errors,
    errorMessage,
    clearErrors,
    setError,
    customRequiredStyles,
    name, // Add this if it's not in your DropdownProps
    defaultValue,
    isRequired,
    value,
  }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(value || null);
  
    const toggleDropdown = () => setIsVisible(!isVisible);
  
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
      setIsVisible(false);
      if (onValueChange) {
        onValueChange(option);
      }
    };
  
    const requiredStyle = {
      color: 'red',
      marginTop: 7,
      marginBottom: 4,
    };
  
    const requiredBorderStyle = errors?.[name]
      ? {
          borderWidth: 1,
          borderColor: 'red',
        }
      : {};
  
    const selectRequiredStyles = customRequiredStyles
      ? [requiredStyle, customRequiredStyles]
      : requiredStyle;
  
    return (
      <View
        style={{
          position: 'relative',
          width: width || 300,
          marginVertical: 4,
          height: 100,
          overflowY: 'hidden',
          zIndex: 4000,
        }}>
        {label ? (
          <Text className='text-small-text-bold text-start font-medium mb-3'>
            {label} {isRequired ? <Text className='text-red-500'>*</Text> : ''}
          </Text>
        ) : null}
        <TouchableOpacity
          activeOpacity={1}
          onPress={toggleDropdown}
          style={{
            backgroundColor: '#E8E1ED',
            borderWidth: 0,
            padding: 12,
            borderRadius: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            ...containerStyle,
            height: 54,
            ...requiredBorderStyle,
          }}>
          {selectedOption?.label || defaultValue?.label ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {selectedOption?.icon || defaultValue?.icon ? (
                <Image
                  source={selectedOption?.icon}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 10,
                  }}
                  resizeMode='contain'
                />
              ) : null}
              <Text style={{ fontFamily: 'Poppins', fontSize: 14, opacity: 1, color: 'white' }}>
                {selectedOption?.label || defaultValue?.label}
              </Text>
            </View>
          ) : (
            <Text
              style={{
                fontFamily: 'Poppins',
                fontSize: 14,
                color: 'white',
                opacity: 0.3,
              }}>
              {placeholder}
            </Text>
          )}
        </TouchableOpacity>
        {isVisible && (
          <View
            style={{
              position: 'relative',
              top: 4,
              backgroundColor: 'black',
              borderColor: '#BDBDBD',
              borderWidth: 1,
              borderRadius: 4,
              width: '100%',
              height: '80%',
              // minHeight: 155,
              maxHeight: 200,
              zIndex: 4000,
            }}>
            <FlatList
              data={options}
              keyExtractor={(item) => item?.label}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleOptionSelect(item)}
                  style={{
                    borderRadius: 4,
                    padding: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: selectedOption?.label === item?.label ? '#2AB34B' : 'black',
                  }}>
                  {item.icon && (
                    <Image
                      source={item.icon}
                      style={{
                        width: 20,
                        height: 20,
                        marginRight: 10,
                      }}
                      resizeMode='contain'
                    />
                  )}
                  <Text
                    style={{
                      fontFamily: 'Poppins_400Regular',
                      fontSize: 16,
                      color: selectedOption?.label === item?.label ? 'white' : 'white',
                    }}>
                    {item?.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        {errors?.[name] && <Text style={selectRequiredStyles}>{errorMessage}</Text>}
      </View>
    );
  };