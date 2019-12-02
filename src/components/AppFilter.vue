<template>
  <section class="app__filter--list">
    <article class="app__filter">
      <label for="gender">Gender</label>
      <select name="gender" id="gender" @change="handleSelectedGender">
        <option value="">Select gender</option>
        <option
          v-for="gender in genders"
          :key="gender"
          :value="gender"
        >{{ gender }}</option>
      </select>
    </article>
    <article class="app__filter">
      <label for="ages">Ages</label>
      <select name="ages" id="ages" @change="handleSelectedAge">
        <option value="">Select age</option>
        <option
          v-for="(age, index) in ages"
          :key="index"
          :value="age.value"
        >{{ age.label }}</option>
      </select>
    </article>
    <article class="app__filter">
      <label for="nationality">Nationality</label>
      <select name="nationality" id="nationality" @change="handleSelectedNationality">
        <option value="">Select nationality</option>
        <option
          v-for="nationality in nationalities"
          :key="nationality"
          :value="nationality"
        >{{ nationality }}</option>
      </select>
    </article>
  </section>
</template>

<script>
export default {
  name: 'AppFilter',
  props: {
    ages: {
      type: Array,
      default: () => []
    },
    genders: {
      type: Array,
      default: () => []
    },
    nationalities: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleSelectedGender (event) {
      this.$emit('selected-gender', event.target.value)
    },
    handleSelectedAge () {
      this.$emit('selected-age', event.target.value)
    },
    handleSelectedNationality () {
      this.$emit('selected-nationality', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.app__filter--list {
  background-color: #ececec;
  padding: 16px;
}
.app__filter {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

  label {
    display: block;
    margin-right: 8px;
    text-align: left;
    min-width: 100px;
  }

  select {
    text-transform: capitalize;
    display: block;
    color: #444;
    line-height: 1.3;
    padding: .4em 1.4em .3em .8em;
    width: 400px;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.03);
    border-radius: .3em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
    linear-gradient(to bottom, #ffffff 0%,#f7f7f7 100%);
    background-repeat: no-repeat, repeat;
    background-position: right .7em top 50%, 0 0;
    background-size: .65em auto, 100%;
    }
    .select-css::-ms-expand {
    display: none;
    }
    .select-css:hover {
    border-color: #888;
    }
    .select-css:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
    }
    .select-css option {
    font-weight:normal;
    }
}

</style>
