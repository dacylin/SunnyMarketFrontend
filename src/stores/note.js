import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useNoteStore = defineStore("note", () => {
  //命名規則必須符合 use + 大寫英文 + Store
  const notesData = ref([
    {
      id: 1,
      title: "Pinia 筆記",
      content: "Pinia是一個狀態管理工具，使用pinia帶出note.js的資料",
    },
    {
      id: 2,
      title: "蘋果",
      content: "這是蘋果",
    },
    {
      id: 3,
      title: "橘子",
      content: "這是橘子",
    },
  ]);

const searchTerm = ref("");

  const searchedNotes = computed(() => {
    if (searchTerm.value === "") {
      return notesData.value;
    } else {
      return notesData.value.filter((notesData) => {
        return notesData.title.includes(searchTerm.value);
      });
    }
  });

  function addNote(title, content) {
    notesData.value.push({
      id: notesData.value.length + 1,
      title,
      content,
    });
    searchTerm.value = "";
  }


  return {
    notesData,
    searchTerm,
    searchedNotes,
    addNote,
  };
});
