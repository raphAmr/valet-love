<template>
  <div class="workers">
    <p>
      ACTION = {{ action }}<br />
      ID = {{ id }}<br />
      <a href="/#/workers/list/all">Back to the list</a><br />
      <a href="/#/workers/edit/0">Add a new worker</a><br />
    </p>

    <!-- Viewing employee details -->
    <table v-if="action === 'show'" class="table table-striped table-bordered table-hover">
      <tr><td>ID</td><td>{{ oneWorker.id_employee }}</td></tr>
      <tr><td>NAME</td><td>{{ oneWorker.name_employee }}</td></tr>
      <tr><td>AGE</td><td>{{ oneWorker.age_employee }}</td></tr>
      <tr><td>GENDER</td><td>{{ oneWorker.gender_employee }}</td></tr>
      <tr><td>POST</td><td>{{ oneWorker.post_employee }}</td></tr>
      <tr><td>SALARY</td><td>{{ oneWorker.salary_employee }}</td></tr>
      <tr><td>BAR ID</td><td>{{ oneWorker.id_bar }}</td></tr>
    </table>

    <!-- Form to modify or add an employee -->
    <table v-if="action === 'edit'" class="table table-striped table-bordered table-hover">
      <tr><td>NAME</td>
        <td><input type="text" v-model="oneWorker.name_employee" /></td></tr>
      <tr><td>AGE</td>
        <td><input type="number" v-model="oneWorker.age_employee" /></td></tr>
      <tr><td>GENDER</td>
        <td><input type="text" v-model="oneWorker.gender_employee" /></td></tr>
      <tr><td>POST</td>
        <td><input type="text" v-model="oneWorker.post_employee" /></td></tr>
      <tr><td>SALARY</td>
        <td><input type="number" v-model="oneWorker.salary_employee" /></td></tr>
      <tr><td>BAR ID</td>
        <td><input type="number" v-model="oneWorker.id_bar" /></td></tr>
      <tr><td colspan="2">
        <input type="button" value="SEND" @click="sendEditRequest()" />
      </td></tr>
    </table>

    <!-- List of all employees -->
    <table v-if="action === 'list'" class="table table-striped table-bordered table-hover">
      <tr>
        <td>ID</td><td>NAME</td><td>AGE</td><td>GENDER</td><td>POST</td><td>SALARY</td><td>BAR ID</td><td>SHOW DETAILS</td><td>EDIT</td><td>DELETE</td>
      </tr>
      <tr v-for="w of workers" :key="w.id_employee">
        <td>{{ w.id_employee }}</td>
        <td>{{ w.name_employee }}</td>
        <td>{{ w.age_employee }}</td>
        <td>{{ w.gender_employee }}</td>
        <td>{{ w.post_employee }}</td>
        <td>{{ w.salary_employee }}</td>
        <td>{{ w.id_bar }}</td>
        <td><a :href="'/#/workers/show/' + w.id_employee">[SHOW]</a></td>
        <td><a :href="`/#/workers/edit/${w.id_employee}`">[EDIT]</a></td>
        <td><input type="button" value="DELETE" @click="sendDeleteRequest(w.id_employee)" /></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'WorkerPage',
  props: ['action', 'id'],
  data() {
    return {
      workers: [],
      oneWorker: {
        id_employee: 0,
        name_employee: '',
        age_employee: 0,
        gender_employee: '',
        post_employee: '',
        salary_employee: 0,
        id_bar: 0
      }
    }
  },
  methods: {
    async loadWorkers() {
      try {
        const response = await fetch('/source/workers.json');
        const data = await response.json();
        this.workers = data;
        this.refreshOneWorker();
      } catch (error) {
        console.error('Error loading workers data:', error);
      }
    },
    refreshOneWorker() {
      if (this.$props.id === 'all' || this.$props.id === '0') return;
      this.oneWorker = this.workers.find(worker => worker.id_employee == this.$props.id) || this.oneWorker;
    },
    async sendDeleteRequest(workerId) {
      this.workers = this.workers.filter(worker => worker.id_employee !== workerId);
    },
    async sendEditRequest() {
      const index = this.workers.findIndex(w => w.id_employee === this.oneWorker.id_employee);
      if (index !== -1) this.workers.splice(index, 1, { ...this.oneWorker });
      else this.workers.push({ ...this.oneWorker });
    }
  },
  watch: {
    id: function(newVal, oldVal) {
      this.refreshOneWorker();
    }
  },
  created() {
    this.loadWorkers();
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
p {
  color: darkgray;
}
.table {
  width: 95%;
  margin: 20px;
}
.table td {
  text-align: left;
}
</style>
