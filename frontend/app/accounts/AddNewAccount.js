import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput, Button, Text } from "react-native-paper";

// Yup schema for validation
const AccountSchema = Yup.object().shape({
  accountName: Yup.string().required("Account name is required"),
  accountType: Yup.string().required("Account type is required"),
});

const AddNewAccount = () => {
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleOnChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <View className="mx-auto">
      <Text className=" text-xl">Add an Account</Text>
      <Formik
        initialValues={{ accountName: "", accountType: "" }}
        validationSchema={AccountSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <View>
              <TextInput
                className="rounded-lg"
                onChangeText={handleChange("accountName")}
                onBlur={handleBlur("accountName")}
                value={values.accountName}
                placeholder="Account Name"
                activeUnderlineColor="magnetic-plum"
                mode="flat"
              />
            </View>
            {errors.accountName && touched.accountName ? (
              <Text style={styles.errorText}>{errors.accountName}</Text>
            ) : null}

            <View>
              <TextInput
                onChangeText={handleChange("accountType")}
                onBlur={handleBlur("accountType")}
                value={values.accountType}
                placeholder="Account Type"
              />
            </View>
            {errors.accountType && touched.accountType ? (
              <Text style={styles.errorText}>{errors.accountType}</Text>
            ) : null}

            <Button
              className="bg-money-green mt-5"
              onPress={handleSubmit}
              title="Add Account"
            >
              <Text className="text-white ">Add Account</Text>
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};
const styles = StyleSheet.create({
  addAnAccount: {
    fontSize: 24,
    lineHeight: 19,
    fontFamily: "Staatliches-Regular",
    color: "#32004c",
    textAlign: "center",
    marginTop: 20,
    paddingTop: 15,
  },
  inputLayout: {
    paddingVertical: 6,
    height: 46,
    borderWidth: 0.8,
    borderColor: "#cfd3d4",
    borderStyle: "solid",
    borderRadius: 6,
    paddingHorizontal: 13,
    width: 296,
  },
  inputContentFlexBox: {
    justifyContent: "space-between",
    alignSelf: "stretch",
    flex: 1,
  },
  labelTypo: {
    color: "#5e6366",
    fontSize: 12,
    textAlign: "left",
  },
  inputContentFlexBox1: {
    flexDirection: "row",
    alignItems: "center",
  },
  label1Typo: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  addAnAccount: {
    fontSize: 24,
    lineHeight: 19,
    fontFamily: "Staatliches-Regular",
    color: "#32004c",
    textAlign: "center",
  },
  accountName: {
    lineHeight: 10,
    fontFamily: "Rubik-Regular",
    width: 93,
    textAlign: "left",
  },
  accountName1: {
    fontSize: 13,
    textAlign: "right",
    width: 115,
    color: "#abafb1",
    fontFamily: "Inter-Regular",
  },
  inputContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: "Inter-Regular",
    textAlign: "left",
    alignSelf: "stretch",
  },
  placehoder: {
    color: "#abafb1",
    textAlign: "left",
    alignSelf: "stretch",
  },
  fichevronDownIcon: {
    width: 19,
    height: 19,
    overflow: "hidden",
    marginLeft: 12.63,
  },
  inputContent1: {
    alignSelf: "stretch",
    flex: 1,
  },
  select: {
    marginTop: 18.95,
  },
  label1: {
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
  component4: {
    borderRadius: 9,
    backgroundColor: "#009933",
    paddingVertical: 13,
    marginTop: 34.74,
    paddingHorizontal: 13,
    width: 296,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputcontainer: {
    marginTop: 31.58,
  },
  innercontainer: {
    width: "100%",
    paddingHorizontal: 0,
    paddingVertical: 58,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default AddNewAccount;
