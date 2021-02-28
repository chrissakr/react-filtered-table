import { tasks } from './data/tasks';
import Table from './components/table';
import './App.css';

function App() {
  let headers = {
    id: {
      name: 'ID',
      searchType: 'dropdown',
      exact: true,
      filterable: false
    },
    title: {
      name: 'Title',
      searchType: 'text',
      exact: false,
      filterable: true
    },
    region: {
      name: 'Region',
      searchType: 'dropdown',
      exact: true,
      filterable: true
    },
    type: {
      name: 'Type',
      searchType: 'dropdown',
      exact: true,
      filterable: true
    },
    description: {
      name: 'Description',
      searchType: 'text',
      exact: false,
      filterable: true
    },
    active: {
      name: 'Is Active',
      searchType: 'dropdown',
      exact: true,
      filterable: false
    }
  };

  return (
    <div className="App">
      <Table data={tasks} headers={headers} />
    </div>
  );
}

export default App;
