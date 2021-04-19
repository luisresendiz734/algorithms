---
title: Queue
date: 2021-04-09
description: How to works a queue data type inside
author: Luis Resendiz
github: luisrdevy
---

A queue is an abstract data type that maintains the order in which elements were added to it, allowing the oldest elements to be removed from the front and new elements to be added to the rear. This is called a *First-In-First-Out* (FIFO) data structure because the first element added to the queue (i.e., the one that has been waiting the longest) is always the first one to be removed.

![Queue data type](./images/queue001.png)

## Basic operations
A basic queue has the following operations:

- **Enqueue (push)**: add a new element to the end of the queue.
- **Dequeue (pop)**: remove the element from the front of the queue and return it.

### Aditional & useful

- **Front**: return the value of the front element if exist.
- **Back**: return the value of the back element if exist.
- **Size**: return the length of the queue, in other words number of elements in the queue.

## Implementation

### Node class
```cpp
template <typename T>
using pointer = T*;

template <typename T>
struct node {
    T value;
    pointer<node> next;
    node(T v): value{v}, next{nullptr} {}
};
```

### Queue class
```cpp
template <typename T>
class queue {
    size_t _size;
    pointer<node<T>> _front, _back;
public:
    queue(): _front{nullptr}, _back{nullptr}, _size{0} {}
}
```

### Push operation
```cpp
auto push(T value) -> void {
	auto n = new node<T>(value);
	if(empty()) {
		_front = _back = n;
	} else {
		_back->next = n, _back = n;
	} ++ _size;
}
```

### Pop operation
```cpp
auto pop() -> void {
	if(empty()) return;
	auto curr_front = _front;
	_front = _front->next;
	delete curr_front;
	-- _size;
}
```

### Empty operation
```cpp
auto empty() -> bool {
	return not _front and not _back;
}
```

### Front operation
```cpp
auto front() -> T {
	return _front->value;
}
```

### Back operation
```cpp
auto back() -> T {
	return _back->value;
}
```

### Size operation
```cpp
auto size() -> size_t {
	return _size;
}
```

## Glosary
- [template<>](https://en.cppreference.com/w/cpp/language/templates)
- [auto](https://en.cppreference.com/w/cpp/language/auto)
- [size_t](https://en.cppreference.com/w/cpp/types/size_t)