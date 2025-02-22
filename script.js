const Node = class{
    constructor(entry){
        this.entry = entry
        this.nextNode = null
    }
}

class LinkedList{
    #head = null;
    #tail = null;
    #size = 0

    append(data){
        const newNode = new Node(data);
        this.#head ??= newNode;
        if (this.#tail) this.#tail.nextNode = newNode;
        this.#tail = newNode;
        this.#size++;
    }

    prepend(data){
        const newNode = new Node(data);
        this.#tail ??= newNode;
        if(this.#head) newNode.nextNode = this.#head;
        this.#head = newNode;
        this.#size++;
    }

    size(){
        return this.#size
    }

    head(){
        return this.#head
    }

    tail(){
        return this.#tail
    }

    // return node at the given index
    at(index){
        if(index >= this.#size || index < 0) return false

        let currentNode = this.#head;
        for(let i = 0; i < index; i++){
            currentNode = currentNode.nextNode;
        }

        return currentNode;
    }
    
    // removes the last element from the list
    pop(){
        if (this.#size === 0) return false

        let penultyNode = this.#head;
        let ultyNode = penultyNode.nextNode || this.#tail;

        while(ultyNode?.nextNode) {
            penultyNode = ultyNode;
            ultyNode = ultyNode.nextNode;
        }

        penultyNode.nextNode = null;
        this.#tail = this.#size === 1 ? null : penultyNode;
        this.#head = !this.#tail ? null : this.#head;

        this.#size--;

        return ultyNode;
    }



    contains(value, extractPrimitive = val => val){
        let currentNode = this.#head
        while(currentNode) {
            const primitiveValue = extractPrimitive(currentNode.entry)
            if(primitiveValue === value) return true
            currentNode = currentNode.nextNode;
        }
        return false
    }

    find(value, extractPrimitive = val => val){
        let currentNode = this.#head
        let counter = 0;
        while(currentNode) {
            const primitiveValue = extractPrimitive(currentNode.entry)
            if(primitiveValue === value) return counter
            currentNode = currentNode.nextNode;
            counter++;
        }
        return null
    }

    toString(extractPrimitive = val => val){
        let listString = "";
        let currentNode = this.#head
        while(currentNode) {
            const primitiveValue = extractPrimitive(currentNode.entry)
            listString += `( ${primitiveValue} ) -> `
            currentNode = currentNode.nextNode;
        }
        return listString + "null"
    }

    traverseList(extractPrimitive = val => val, callback = args => args){
        let currentNode = this.#head
        let index = 0;
        let returnArray = [];
        while(currentNode) {
            const primitiveValue = extractPrimitive(currentNode.entry)
            returnArray.push(callback(...args))
            currentNode = currentNode.nextNode;
            index++
        }
        return returnArray
    }

    indexAt(entry, index){
        const newNode = new Node(entry);
        let preNode = this.#head;
        let counter = 0;
        while(counter < index - 1){
            preNode = preNode.nextNode
        }
        newNode.nextNode = preNode.nextNode;
        preNode.nextNode = newNode;
        this.#size++;
    }

    removeAt(index){
        let preNode = this.#head;
        let counter = 0;
        while(counter < index - 1){
            preNode = preNode.nextNode
        }
        let deletedNode = preNode.nextNode;
        let postNode = deletedNode.nextNode;
        preNode.nextNode = postNode;
        this.#size--;

        return deletedNode;
    }
}

// example uses class syntax - adjust as necessary
const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

