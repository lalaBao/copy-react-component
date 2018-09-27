<template>
  <div>
    <toolbar></toolbar>
    <data-table></data-table>
    <main-dialog></main-dialog>
  </div>
</template>

<script>
  import Toolbar from './commonExample/Toolbar';
  import DataTable from './commonExample/DataTable';
  import MainDialog from './commonExample/MainDialog';

  export default {
    name: 'CommonExample',
    components: {
      Toolbar,
      DataTable,
      MainDialog,
    },
  };
</script>
