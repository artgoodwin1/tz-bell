export default function createTask(name) {
  return {
    id: Date.now(),
    labelDescription: name,
    done: false,
    edited: false,
  };
}
