import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image } from 'react-native';
import { firestore } from './backend'; 
import { doc, getDoc } from 'firebase/firestore'; 
import { useLocalSearchParams, useNavigation } from 'expo-router'; 
import LoadingSpinner from './LoadingSpinner'; 

const DrinkDetails: React.FC = () => {
  const [drink, setDrink] = useState<any>(null);
  const [loading, setLoading] = useState(true); 
  const { drinkId } = useLocalSearchParams(); 
  const navigation = useNavigation(); 

  // Fetch the specific drink from Firestore
  useEffect(() => {
    const fetchDrink = async () => {
      try {
        setLoading(true); 
        const drinkDocRef = doc(firestore, 'drinks', drinkId as string);
        const drinkSnapshot = await getDoc(drinkDocRef); 
        if (drinkSnapshot.exists()) {
          const drinkData = drinkSnapshot.data();
          setDrink(drinkData);
          
          if (drinkData.drinkName) {
            navigation.setOptions({ title: drinkData.drinkName });
          }
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching drink:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchDrink();
  }, [drinkId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <LoadingSpinner isVisible={loading} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/images/sbl.png')} style={styles.headerImage} />
        <Text style={styles.drinkName}>{drink.drinkName}</Text>
      </View>

      <View style={styles.ingredientsContainer}>
        <Image source={require('../assets/images/coffee-beans.png')} style={styles.smallImage} />
        <Text style={styles.sectionTitle}>Ingredients:</Text>
        <Text style={styles.text}>{drink.ingredients}</Text>       
      </View>

      <View style={styles.methodContainer}>
        <Image source={require('../assets/images/coffee-maker.png')} style={styles.smallImage} />
        <Text style={styles.sectionTitle}>Method:</Text>
        <Text style={styles.text}>{drink.method}</Text>     
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  headerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 0,
  },

  headerImage: {
    resizeMode: 'contain',
    height: 100,
    width: 100,
    marginTop: 10,
  },

  smallImage: {
    height: 35,
    width: 35,
    marginRight: 15,
  },

  drinkName: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  ingredientsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },

  methodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    textAlign: 'center',
  },

  text: {
    fontSize: 18,
    marginTop: 10,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DrinkDetails;
