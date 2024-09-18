import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { firestore } from './backend';
import { collection, getDocs } from 'firebase/firestore'; 
import { useNavigation } from '@react-navigation/native';  
import LoadingSpinner from './LoadingSpinner'; 

const Home: React.FC = () => {
  const [drinks, setDrinks] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true); 
  const navigation = useNavigation();  

  // Fetch all drinks from Firestore
  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        setLoading(true); 
        const drinksCollectionRef = collection(firestore, 'drinks'); 
        const drinksSnapshot = await getDocs(drinksCollectionRef);
        const drinksData = drinksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
        setDrinks(drinksData); 
      } catch (error) {
        console.error('Error fetching drinks:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchDrinks();
  }, []);

  const handlePress = (drinkId: string, drinkName: string) => {
    navigation.navigate('drinks', { drinkId, drinkName }); 
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <LoadingSpinner isVisible={loading} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/images/sbl.png')} style={styles.headerImage}/>
      <Text style={styles.defaultText}>Starbucks Learn</Text>

      <ScrollView contentContainerStyle={styles.drinksListContainer} showsVerticalScrollIndicator={false}>
        {drinks.length > 0 ? (
          drinks.map(drink => (
            <TouchableOpacity 
              key={drink.id} 
              style={styles.drinkItem} 
              activeOpacity={0.7} 
              onPress={() => handlePress(drink.id, drink.drinkName)} 
            >
              <View style={styles.drinkContent}>
                <Image source={require('../assets/images/coffee-cup.png')} style={styles.icon} />      
                <Text style={styles.drinkName}>{drink.drinkName}</Text>               
                <Image source={require('../assets/images/angle-small-right.png')} style={styles.forwardIcon} />
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No drinks available</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerImage: {
    resizeMode: 'contain',
    height: 100,
    width: 100,
    marginTop: 10,
  },
  defaultText: {
    fontFamily: 'verdana',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
  },
  drinksListContainer: {
    paddingVertical: 20,
    width: '100%', 
    alignItems: 'center',
    justifyContent: 'center'
  },
  drinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  drinkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', 
    justifyContent: 'space-between',
  },
  drinkName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  forwardIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
