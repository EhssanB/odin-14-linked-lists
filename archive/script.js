const Node = class{
    constructor(){
        this.value = null;
        this.nextNode = null;
    }
}

const LinkedList = class{

    constructor(){
        this.size = 0;
        this.head = null;
        this.tail = null;
    }

    size(){
        return size
    }

    head(){
        return head
    }

    tail(){
        return tail
    }

    traverseList(callback, args){
        let currentNode = this.head;
        for(let i = 0; i < this.size; i++){
            callback.call(this, currentNode, ...args)
            currentNode = currentNode.nextNode;
        }
    }

    append(value){
        const newNode = new Node();
        newNode["value"] = value;

        if(!this.head){
            this.head = newNode;
        }

        if(this.tail){
            this.tail.nextNode = newNode;
        }

        this.tail = newNode;
        this.size += 1;
    }

    prepend(value){
        const newNode = new Node();
        newNode["value"] = value;

        if(!this.head) {
            this.head = newNode;
            this.size += 1;
        }

        newNode.nextNode = this.head;
        this.head = newNode;
        
        this.size += 1;
    }

    at(index){
        let currentNode = this.head;
        let counter = 0;
        while(counter <= index){

            if(counter !== index){
                currentNode = currentNode.nextNode;
                counter++;
                continue;
            }

            return currentNode
        }
    }

    pop(){
        const penultimateIndex = this.size - 2;
        const penultimateNode = this.at(penultimateIndex);

        penultimateNode.nextNode = null;
        this.tail = penultimateNode;
        this.size -= 1;
    }

    contains(value){
        let currentNode = this.head;

        for(let i = 0; i < this.size; i++){
            if(currentNode["value"] === value) return true
            currentNode = currentNode.nextNode
        }
        return false
    }

    find(value){
        let currentNode = this.head;

        for(let i = 0; i < this.size; i++){
            if(currentNode["value"] === value) return i
            currentNode = currentNode.nextNode
        }
        return null
    }

    toString(){
        let stringifiedList = "";
        let currentNode = this.head;

        for(let i = 0; i < this.size; i++){
            stringifiedList += `( ${currentNode.value} ) -> `
            currentNode = currentNode.nextNode;
        }
        
        stringifiedList += "null";

        return stringifiedList
    }

    insertAt(value, index){

        if (index === 0) {
            this.prepend(value)
            return;
        }

        if (index >= this.size - 1){
            this.append(value)
            return;
        }

        const newNode = new Node();
        newNode["value"] = value;

        let preNode = this.head

        for (let i=0; i < index; i++){
            if (i === index - 1) break;
            preNode = preNode.nextNode;
        }
        
        const postNode = preNode.nextNode;

        newNode.nextNode = postNode;
        preNode.nextNode = newNode;
       
        
        this.size += 1;
    }

    removeAt(index){

        if (index >= this.size-1) {
            this.pop()
            return
        }

        let preNode = this.head;

        for (let i=0; i <= index; i++){
            if (i === index) break;
            preNode = preNode.nextNode;
        }

        const deletedNode = preNode.nextNode;
        preNode.nextNode = deletedNode.nextNode;

        this.size -= 1;
    }
}

// example uses class syntax - adjust as necessary
const list = new LinkedList();


// HashMap

// needs hashing function: takes key converts to hash
// add entry: Input: key, value; Output: null; Side-effect: adds key-value pair to HashMap
// get entry: Input: key; Output: value associated with key;
// remove entry: Input: key; Output: null; side-effect: removes key-value pair from HashMap
// increase HashMap size: Condition: if capacity * loadFactor > HashMap size, then double HashMap and copy entries
// 

const HASH_PRIME = 31;

const HashMap = class{
    constructor(capacity, loadFactor){
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.buckets = []
    }

    hash(key){
        let hashCode = 0
        for(let i = 0; i < key.length; i++){
            hashCode = (HASH_PRIME * hashCode + key.charCodeAt(i)) % this.capacity
        }
        return hashCode
    }

    set(key, value){
        const hashedBucketIndex = this.hash(key);
        if (hashedBucketIndex < 0 || hashedBucketIndex >= this.capacity.length) {
            throw new Error("Trying to set outside bucket capacity");
        }
        
        if(!this.buckets[hashedBucketIndex]) this.buckets[hashedBucketIndex] = new LinkedList();

        const bucketList = this.buckets[hashedBucketIndex];
        const listSize = bucketList.size;
        let currentBucketNode = bucketList.head;

        for (let i = 0; i < listSize; i++){
            if(bucketList.values === key) {
                bucketList.value.value = value
                return
            }
            currentBucketNode = currentBucketNode.nextNode;
        }

        bucketList.append({[key]:value})
    }
}

const test = new HashMap(16, 0.75) // or HashMap() if using a factory

test.set('apple', 'red')
test.set('apple', 'magenta')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

//console.log(test);