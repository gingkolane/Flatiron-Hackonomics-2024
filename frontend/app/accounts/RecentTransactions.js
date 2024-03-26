import * as React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import IconTravel from "../../assets/icons/travel.svg";
import IconWallet from "../../assets/icons/wallet.svg";
import IconTransaction from "../../assets/icons/transaction-item.svg";

const RecentTransaction = () => {
  return (
    <View style={[styles.transactionSection, styles.header1ChildLayout]}>
      <View style={styles.header1}>
        <Text style={styles.headerTitle}>Recent Transactions</Text>
        <Image
          style={[styles.header1Child, styles.header1ChildLayout]}
          resizeMode="cover"
          source="Line 7.png"
        />
      </View>
      <View style={[styles.transactionItem, styles.transactionItemSpaceBlock]}>
        <View style={styles.transactionItemFrame}>
          <Image
            style={styles.transactionItemFrameChild}
            resizeMode="cover"
            source="Ellipse 9.png"
          />
          <Image
            style={[styles.mdishoppingOutlineIcon, styles.outlineIconLayout]}
            resizeMode="cover"
            source="mdi:shopping-outline.png"
          />
          <IconTravel />
          <Text style={[styles.electronics, styles.textTypo]}>Travel</Text>
          <Text style={[styles.text, styles.textTypo]}>16-11-23</Text>

          <Text style={[styles.text1, styles.textTypo]}>-5000</Text>
          <Image
            style={[styles.ioncardOutlineIcon, styles.outlineIconLayout]}
            resizeMode="cover"
            source="ion:card-outline.png"
          />
        </View>
      </View>
      <View style={[styles.transactionItem1, styles.transactionItemSpaceBlock]}>
        <View style={styles.transactionItemFrame}>
          <Image
            style={styles.transactionItemFrameChild}
            resizeMode="cover"
            source="Ellipse 9.png"
          />
          <Image
            style={[styles.mdishoppingOutlineIcon, styles.outlineIconLayout]}
            resizeMode="cover"
            source="mdi:shopping-outline.png"
          />
          {/* <IconTransaction /> */}
          <Text style={[styles.electronics, styles.textTypo]}>Shopping</Text>
          <Text style={[styles.text, styles.textTypo]}>16-11-23</Text>

          <Text style={[styles.text1, styles.textTypo]}>-5000</Text>
          <Image
            style={[styles.ioncardOutlineIcon, styles.outlineIconLayout]}
            resizeMode="cover"
            source="ion:card-outline.png"
          />
        </View>
      </View>
      <View style={[styles.transactionItem2, styles.transactionItemSpaceBlock]}>
        <View style={styles.transactionItemFrame}>
          <Image
            style={styles.transactionItemFrameChild}
            resizeMode="cover"
            source="Ellipse 9.png"
          />
          <Image
            style={[styles.mdishoppingOutlineIcon, styles.outlineIconLayout]}
            resizeMode="cover"
            source="mdi:shopping-outline.png"
          />

          <Text style={[styles.electronics, styles.textTypo]}>Electronics</Text>
          <Text style={[styles.text, styles.textTypo]}>16-11-23</Text>
          <Text style={[styles.text1, styles.textTypo]}>-5000</Text>
          <Image
            style={[styles.ioncardOutlineIcon, styles.outlineIconLayout]}
            resizeMode="cover"
            source="ion:card-outline.png"
          />
        </View>
      </View>
      <View style={[styles.transactionItem3, styles.transactionItemSpaceBlock]}>
        <View style={styles.transactionItemFrame}>
          <Image
            style={styles.transactionItemFrameChild}
            resizeMode="cover"
            source="Ellipse 9.png"
          />
          <Image
            style={[styles.mdishoppingOutlineIcon, styles.outlineIconLayout]}
            resizeMode="cover"
            source="mdi:shopping-outline.png"
          />
          <IconWallet />

          <Text style={[styles.electronics, styles.textTypo]}>Electronics</Text>
          <Text style={[styles.text, styles.textTypo]}>16-11-23</Text>
          <Text style={[styles.text1, styles.textTypo]}>-5000</Text>
          <Image
            style={[styles.ioncardOutlineIcon, styles.outlineIconLayout]}
            resizeMode="cover"
            source="ion:card-outline.png"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header1ChildLayout: {
    overflow: "hidden",
    width: "100%",
  },
  transactionItemSpaceBlock: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 393,
    backgroundColor: "#fdfdfe",
    left: 0,
    position: "absolute",
    overflow: "hidden",
  },
  outlineIconLayout: {
    height: 20,
    width: 20,
    top: 9,
    position: "absolute",
    overflow: "hidden",
  },
  textTypo: {
    display: "flex",
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    alignItems: "center",
    lineHeight: 20,
    position: "absolute",
  },
  headerTitle: {
    top: "0%",
    left: "3.02%",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "#32004c",
    textAlign: "left",
    lineHeight: 20,
    position: "absolute",
  },
  header1Child: {
    height: "3.45%",
    top: "96.55%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
  },
  header1: {
    top: 20,
    left: 15,
    height: 29,
    width: 364,
    position: "absolute",
  },
  transactionItemFrameChild: {
    top: 5,
    width: 28,
    height: 28,
    left: 0,
    position: "absolute",
  },
  mdishoppingOutlineIcon: {
    left: 4,
  },
  electronics: {
    top: 0,
    width: 78,
    color: "#000",
    left: 40,
    display: "flex",
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    textAlign: "left",
    fontSize: 14,
  },
  text: {
    top: 18,
    fontSize: 12,
    width: 49,
    color: "#000",
    left: 40,
    display: "flex",
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    textAlign: "left",
  },
  text1: {
    left: 304,
    color: "#ff0000",
    textAlign: "right",
    width: 45,
    display: "flex",
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    fontSize: 14,
    top: 9,
  },
  ioncardOutlineIcon: {
    left: 231,
  },
  transactionItemFrame: {
    height: 38,
    width: 364,
  },
  transactionItem: {
    top: 49,
  },
  transactionItem1: {
    top: 99,
  },
  transactionItem2: {
    top: 149,
  },
  transactionItem3: {
    top: 199,
  },
  transactionSection: {
    backgroundColor: "#fafafb",
    shadowColor: "rgba(0, 0, 0, 0.06)",
    shadowOffset: {
      width: 0,
      height: 26.746257781982422,
    },
    shadowRadius: 42.79,
    elevation: 42.79,
    shadowOpacity: 1,
    flex: 1,
    height: 276,
  },
});

export default RecentTransaction;
