import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys:
// ToDo:activeTasks -> { tasks: [...] }
// Planning:Day{N} -> { tasks: [...], day: N }

export async function loadToDoTasks() {
  try {
    const raw = await AsyncStorage.getItem('ToDo:activeTasks');
    if (!raw) return [];
    const obj = JSON.parse(raw);
    return obj.tasks || [];
  } catch (e) {
    console.log('loadToDoTasks error', e);
    return [];
  }
}

export async function saveToDoTasks(tasks) {
  try {
    await AsyncStorage.setItem('ToDo:activeTasks', JSON.stringify({ tasks, updatedAt: Date.now() }));
  } catch (e) {
    console.log('saveToDoTasks error', e);
  }
}

export async function loadPlanningDoc(documentName) {
  try {
    const raw = await AsyncStorage.getItem(`Planning:${documentName}`);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch (e) {
    console.log('loadPlanningDoc error', e);
    return undefined;
  }
}

export async function savePlanningDoc(documentName, obj) {
  try {
    await AsyncStorage.setItem(`Planning:${documentName}`, JSON.stringify(obj));
  } catch (e) {
    console.log('savePlanningDoc error', e);
  }
}

export async function getPlanningRange(startDay, endDay) {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const planningKeys = keys.filter(k => k.startsWith('Planning:Day'));
    const matching = planningKeys.filter(k => {
      const day = parseInt(k.replace('Planning:Day',''));
      return !Number.isNaN(day) && day >= startDay && day <= endDay;
    });
    if (matching.length === 0) return [];
    const pairs = await AsyncStorage.multiGet(matching);
    // return array of { key, data }
    return pairs.map(([key, value]) => ({ key, data: value ? JSON.parse(value) : undefined }));
  } catch (e) {
    console.log('getPlanningRange error', e);
    return [];
  }
}

export default {
  loadToDoTasks,
  saveToDoTasks,
  loadPlanningDoc,
  savePlanningDoc,
  getPlanningRange
};
