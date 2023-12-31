import React, { useContext, useState } from "react";
import { Keyboard, View, StyleSheet } from "react-native";
import { Button, Input, Text } from "@rneui/base";
import SearchLocation from "../destinations/SearchLocation";
import { Formik } from "formik";
import * as yup from "yup";
import { UserContext } from "../../contexts/UserContext";
import {
  addDestinationToUser,
  returnUpdatedDestinationList,
} from "../../services/api";

const validationSchema = yup.object().shape({
  label: yup.string().required("Label is Required"),
});

export default function AddDestination({ destinations, setDestinations }) {
  const { currentUser } = useContext(UserContext);
  const initialValues = {
    label: "",
  };
  const [locations, setLocations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [query, setQuery] = useState("");

  const handleAddDestination = (values, { resetForm }) => {
    const isDuplicateLabel = destinations.some(
      (destination) => destination.label === values.label
    );
  
    if (isDuplicateLabel) {
      setValidationMessage("Label is already in use");
      return;
    }
  
    if (!selectedDestination && !query) {
      setValidationMessage("Please select a destination to add");
      return;
    }
  
    if (!selectedDestination && query) {
      if (!locations || locations?.length === 0) {
        setValidationMessage("Cannot find the location entered");
      } else {
        setValidationMessage("Please choose a destination from the list");
      }
      return;
    }
  
    resetForm({ label: "" });
    setValidationMessage("");
    setLocations([]);
  
    const label = { label: values.label };
    const newDestination = { ...selectedDestination, ...label };
    setDestinations([...destinations, newDestination]);
  
    return addDestinationToUser(currentUser, newDestination, values.label)
      .then(() => {
        return returnUpdatedDestinationList(currentUser, setDestinations);
      })
      .then(() => {
        console.log("Destination added to the database");
        setSelectedDestination(null);
        Keyboard.dismiss();
      });
  };

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleAddDestination}
        style={styles.form}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <View style={styles.formContainer}>
            <SearchLocation
              placeholder="Search for a new destination"
              selectedDestination={selectedDestination}
              setSelectedDestination={setSelectedDestination}
              query={query}
              setQuery={setQuery}
              locations={locations}
              setLocations={setLocations}
            />
            <Text style={{ color: "red" }}>{validationMessage}</Text>
            <Input
              placeholder="Label"
              value={values.label}
              onChangeText={handleChange("label")}
              onBlur={handleBlur("label")}
              name="label"
              errorStyle={errors.label && touched.label ? { color: "red" } : {}}
              errorMessage={errors.label && touched.label ? errors.label : ""}
            />
            <Button
              onPress={handleSubmit}
              title="Add"
              disabled={!isValid || values.label === "" || selectedDestination === ""}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#efefef",
    zIndex: 3,
    elevation: 3,
  },
});