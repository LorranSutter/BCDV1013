import React from 'react';
import * as idb from 'idb';

const dbPromise = idb.openDB('todo-db', 1, {
	upgrade(db) {
		let items = db.createObjectStore('items', {
			keyPath: 'id',
			autoIncrement: true,
		});

		items.createIndex('status', 'status');
		items.createIndex('created', 'created');
		items.createIndex('description', 'description');
		items.createIndex('priority', 'priority');
	}
});


class TodoApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [],
		};

		this.wrapper = {
			margin: '20px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		};

		this.content = {
			width: '45%',
			padding: '10px',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			height: '75%',
			borderRadius: '10px',
			boxShadow: '2px 2px 10px #AAAAAA'
		};

		this.inputContent = {
			margin: '1em',
		};

		this.inputStyle = {
			boxSizing: 'border-box',
			padding: '0 1em',
			height: '40px',
			width: '400px',
			borderRadius: '5px',
			border: '1px solid #AAAAAA',
			outline: 'none'
		};

		this.selectStyle = {
			margin: '0 1em',
			padding: '0 1em',
			boxSizing: 'border-box',
			height: '40px',
			width: '100px',
			borderRadius: '5px',
			border: '1px solid #AAAAAA',
			outline: 'none'
		};

		this.buttonStyle = {
			boxSizing: 'border-box',
			height: '40px',
			width: '100px',
			borderRadius: '5px',
			border: 'none',
			outline: 'none'
		};

		this.tableStyle = {
			width: '100%',
		};

		this.tableHeaderStyle = {
			padding: '10px',
			color: '#F9F9F9',
			background: '#AAAAAA'
		};

		this.refreshItems();
	}

	async refreshItems() {
		let db = await dbPromise;
		let items = await db.getAll('items');

		this.setState({ items, });
	}

	async addItem() {
		if (this.refs.description.value === '') {
			this.setState({ addError: 'Empty description', });
			return;
		}

		let newItem = {
			status: 'open',
			created: new Date(),
			description: this.refs.description.value,
			priority: this.refs.priority.value,
		};

		let db = await dbPromise;
		let tx = db.transaction('items', 'readwrite');

		tx.store.add(newItem);

		await tx.done;

		this.refs.description.value = '';
		this.refreshItems();
	}

	async completeItem(id) {
		let db = await dbPromise;
		let tx = db.transaction('items', 'readwrite');

		let item = await db.get('items', id);
		item.status = 'complete';
		await db.put('items', item);

		await tx.done;

		this.refreshItems();
	}

	render() {
		return (
			<div style={this.wrapper}>
				<div style={this.content}>

					<h1>Add TODO Item</h1>
					<div style={this.inputContent}>
						<input ref="description" placeholder="description" style={this.inputStyle} />
						<select ref="priority" defaultValue="medium" style={this.selectStyle}>
							<option value="low">low</option>
							<option value="medium">medium</option>
							<option value="high">high</option>
						</select>
						<button onClick={() => this.addItem()} style={this.buttonStyle}>Add Item</button>
					</div>

					<div style={{ color: 'red' }}>{this.state.addError}</div>

					<table style={this.tableStyle}>
						<th style={this.tableHeaderStyle}>Description</th>
						<th style={this.tableHeaderStyle}>Priority</th>
						<th style={this.tableHeaderStyle}>Status</th>
						{this.state.items.map((item) => (
							<TodoItem
								item={item}
								key={item.id}
								onCompleted={() => this.completeItem(item.id)}
							/>)
						)}
					</table>
				</div>
			</div>
		);
	}
}


function TodoItem(props) {
	const buttonStyle = {
		boxSizing: 'border-box',
		border: 'none',
		borderRadius: '5px',
		height: '30px',
		outline: 'none',
		background: '#AAAAAA'
	};

	const todoRowStyle = {
		textAlign: 'center',
		background: '#F2F2F2'
	};

	const todoColumnStyle = {
		padding: '10px 0'
	};

	let status = props.item.status;
	if (status === 'open') status = <button onClick={props.onCompleted} style={buttonStyle}>Completed</button>;

	return (
		<tr style={todoRowStyle}>
			<td style={todoColumnStyle}>
				{props.item.description}
			</td>
			<td style={todoColumnStyle}>
				{props.item.priority}
			</td>
			<td style={todoColumnStyle}>
				{status}
			</td>
		</tr>
	);
}


function App() {
	return <div>
		<TodoApp />
	</div>;
}

export default App;