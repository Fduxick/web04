<template>
  <div
    class="note"
    :style="{ top: note.coords.y + 'px', left: note.coords.x + 'px' }"
  >
    <div class="hud">
      <select @change="handleSelectChange">
        <option
          v-for="categorie in categories"
          :key="categorie.id"
          :value="categorie.id"
          :selected="categorie.id === note.categorie"
        >
          {{ categorie.type }}
        </option>
      </select>
      <button class="btn" @click="deleteNote(note)">X</button>
    </div>
    <textarea
      class="textarea"
      :value="note.text"
      @input="handleTextAreaChange"
      placeholder="Start typing.."
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true,
    },
  },

  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },

  methods: {
    handleTextAreaChange(e) {
      const noteToUpdate = { ...this.note, text: e.target.value };

      this.$store.dispatch("updateNote", noteToUpdate);
    },

    handleSelectChange(e) {
      const noteToUpdate = { ...this.note, categorie: Number(e.target.value) };

      this.$store.dispatch("updateNote", noteToUpdate);
    },

    deleteNote(data) {
      this.$store.dispatch("deleteNote", data);
    },
  },
};
</script>

<style scoped>
.note {
  position: absolute;
  top: 0;
  left: 0;

  width: 350px;
  height: 200px;

  background-color: #58f3a3d5;

  overflow: hidden;
}

.hud {
  width: 100%;
  height: 30px;
  padding: 0 8px;

  cursor: pointer;

  background-color: #380202;

  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.textarea {
  width: 100%;
  height: 100px;
  padding: 8px;

  resize: none;

  font-size: 16px;

  outline: none;
  border: none;
  background-color: transparent;
  color: #000;
}

.btn {
  width: 16px;
  height: 16px;
  border: none;
  margin-left: 5px;
  font-size: 11px;

  cursor: pointer;
}
</style>
