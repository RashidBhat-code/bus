import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { BUS_OPERATORS, INITIAL_BOOKINGS } from '../data/mockBuses';

// Collection references
export const COLLECTIONS = {
  BUSES: 'buses',
  BOOKINGS: 'bookings',
  SYSTEM: 'system_metadata'
};

/**
 * Check connectivity to Firestore
 */
export async function testFirestoreConnection() {
  try {
    const testRef = doc(db, COLLECTIONS.SYSTEM, 'ping');
    await setDoc(testRef, { lastPing: serverTimestamp() }, { merge: true });
    return { success: true, message: 'Connected to Firebase Firestore' };
  } catch (error) {
    console.warn('Firestore connectivity check:', error);
    return { 
      success: false, 
      code: error.code, 
      message: error.message 
    };
  }
}

/**
 * Seed initial Indian buses into Firestore if collection is empty
 */
export async function seedInitialBusesIfEmpty() {
  try {
    const colRef = collection(db, COLLECTIONS.BUSES);
    const snap = await getDocs(colRef);
    
    if (snap.empty) {
      console.log('⚡ Firestore buses collection is empty. Seeding initial Indian express buses...');
      const batchPromises = BUS_OPERATORS.map(bus => {
        const busDocRef = doc(db, COLLECTIONS.BUSES, bus.id);
        return setDoc(busDocRef, {
          ...bus,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      });
      await Promise.all(batchPromises);
      console.log(`✅ Successfully seeded ${BUS_OPERATORS.length} buses into Firebase Firestore.`);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error seeding initial buses:', error);
    return false;
  }
}

/**
 * Seed initial bookings into Firestore if collection is empty
 */
export async function seedInitialBookingsIfEmpty() {
  try {
    const colRef = collection(db, COLLECTIONS.BOOKINGS);
    const snap = await getDocs(colRef);

    if (snap.empty) {
      console.log('⚡ Firestore bookings collection is empty. Seeding sample booking...');
      const batchPromises = INITIAL_BOOKINGS.map(booking => {
        const bookingDocRef = doc(db, COLLECTIONS.BOOKINGS, booking.pnr);
        return setDoc(bookingDocRef, {
          ...booking,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      });
      await Promise.all(batchPromises);
      console.log(`✅ Successfully seeded ${INITIAL_BOOKINGS.length} sample bookings into Firestore.`);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error seeding initial bookings:', error);
    return false;
  }
}

/**
 * Force re-seed database with default Indian bus catalog & bookings
 */
export async function resetAndSeedDatabase() {
  try {
    // Seed buses
    for (const bus of BUS_OPERATORS) {
      const busDocRef = doc(db, COLLECTIONS.BUSES, bus.id);
      await setDoc(busDocRef, {
        ...bus,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });
    }

    // Seed bookings
    for (const booking of INITIAL_BOOKINGS) {
      const bookingDocRef = doc(db, COLLECTIONS.BOOKINGS, booking.pnr);
      await setDoc(bookingDocRef, {
        ...booking,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });
    }

    return { success: true, count: BUS_OPERATORS.length };
  } catch (error) {
    console.error('Error during manual database seed:', error);
    throw error;
  }
}

/**
 * Realtime listener for buses from Firestore
 * Falls back to mock data if Firestore throws error
 */
export function subscribeToBuses(onData, onError) {
  try {
    const busesRef = collection(db, COLLECTIONS.BUSES);
    return onSnapshot(
      busesRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const busesList = snapshot.docs.map(docSnap => ({
            id: docSnap.id,
            ...docSnap.data()
          }));
          onData(busesList);
        } else {
          // If empty in Firestore, seed it and provide local copy meanwhile
          seedInitialBusesIfEmpty();
          onData(BUS_OPERATORS);
        }
      },
      (error) => {
        console.warn('Firestore subscribeToBuses snapshot error:', error);
        if (onError) onError(error);
        // Fallback to local default data
        onData(BUS_OPERATORS);
      }
    );
  } catch (err) {
    console.warn('Firestore subscribeToBuses failed to initialize listener:', err);
    if (onError) onError(err);
    onData(BUS_OPERATORS);
    return () => {};
  }
}

/**
 * Realtime listener for bookings from Firestore
 */
export function subscribeToBookings(onData, onError) {
  try {
    const bookingsRef = collection(db, COLLECTIONS.BOOKINGS);
    return onSnapshot(
      bookingsRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const bookingsList = snapshot.docs.map(docSnap => ({
            pnr: docSnap.id,
            ...docSnap.data()
          }));
          // Sort by date / timestamp descending
          bookingsList.sort((a, b) => {
            const timeA = a.createdAt?.seconds || new Date(a.bookingDate || 0).getTime();
            const timeB = b.createdAt?.seconds || new Date(b.bookingDate || 0).getTime();
            return timeB - timeA;
          });
          onData(bookingsList);
        } else {
          seedInitialBookingsIfEmpty();
          onData(INITIAL_BOOKINGS);
        }
      },
      (error) => {
        console.warn('Firestore subscribeToBookings snapshot error:', error);
        if (onError) onError(error);
        onData(INITIAL_BOOKINGS);
      }
    );
  } catch (err) {
    console.warn('Firestore subscribeToBookings failed to initialize:', err);
    if (onError) onError(err);
    onData(INITIAL_BOOKINGS);
    return () => {};
  }
}

/**
 * Add or update a bus in Firestore
 */
export async function saveBusToFirestore(bus) {
  try {
    const busId = bus.id || `bus-${Date.now()}`;
    const busRef = doc(db, COLLECTIONS.BUSES, busId);
    const busPayload = {
      ...bus,
      id: busId,
      updatedAt: serverTimestamp()
    };
    if (!bus.createdAt) {
      busPayload.createdAt = serverTimestamp();
    }
    await setDoc(busRef, busPayload, { merge: true });
    return { success: true, busId };
  } catch (error) {
    console.error('Error saving bus to Firestore:', error);
    throw error;
  }
}

/**
 * Save new booking to Firestore
 */
export async function saveBookingToFirestore(booking) {
  try {
    const pnr = booking.pnr;
    const bookingRef = doc(db, COLLECTIONS.BOOKINGS, pnr);
    
    const payload = {
      ...booking,
      pnr,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(bookingRef, payload);

    // Also update seat statuses in the bus document if it exists in Firestore
    if (booking.busId && booking.seats && booking.seats.length > 0) {
      try {
        const busRef = doc(db, COLLECTIONS.BUSES, booking.busId);
        const busSnap = await getDoc(busRef);
        if (busSnap.exists()) {
          const busData = busSnap.data();
          const bookedSeatNumbers = new Set(booking.seats.map(s => s.seatNumber));
          
          const updateDeck = (deck = []) => deck.map(seat => {
            if (bookedSeatNumbers.has(seat.number)) {
              return { ...seat, status: 'booked' };
            }
            return seat;
          });

          const newLowerDeck = updateDeck(busData.lowerDeck || []);
          const newUpperDeck = updateDeck(busData.upperDeck || []);
          const remainingAvailable = [...newLowerDeck, ...newUpperDeck].filter(s => s.status === 'available').length;

          await updateDoc(busRef, {
            lowerDeck: newLowerDeck,
            upperDeck: newUpperDeck,
            availableSeatsCount: remainingAvailable,
            updatedAt: serverTimestamp()
          });
        }
      } catch (busUpdateErr) {
        console.warn('Could not auto-update seat occupancy on bus doc:', busUpdateErr);
      }
    }

    return { success: true, pnr };
  } catch (error) {
    console.error('Error saving booking to Firestore:', error);
    throw error;
  }
}

/**
 * Cancel a booking in Firestore
 */
export async function cancelBookingInFirestore(pnr) {
  try {
    const bookingRef = doc(db, COLLECTIONS.BOOKINGS, pnr);
    await updateDoc(bookingRef, {
      status: 'CANCELLED',
      cancelledAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, pnr };
  } catch (error) {
    console.error('Error cancelling booking in Firestore:', error);
    throw error;
  }
}

/**
 * Delete a bus document
 */
export async function deleteBusFromFirestore(busId) {
  try {
    const busRef = doc(db, COLLECTIONS.BUSES, busId);
    await deleteDoc(busRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting bus from Firestore:', error);
    throw error;
  }
}
