# TaskManager-Pro

A robust, full-stack Task Management application designed to help users organize, track, and manage their daily tasks efficiently. The application features secure user authentication, role-based access control (Admin/User), and a dynamic dashboard for real-time task updates.

## Features

* **User Authentication:** Secure login and registration using JWT (JSON Web Tokens).
* **Role-Based Access Control:**
    * **User:** Can manage their own personal tasks.
    * **Admin:** Can view and manage tasks across all users.
* **Task Management (CRUD):**
    * **Create:** Add new tasks with deadlines.
    * **Read:** View tasks with status indicators (Pending, Completed, Failed).
    * **Update:** Edit task details, deadlines, and completion status.
    * **Delete:** Remove unwanted tasks.
* **Smart Status Logic:** Automatically marks tasks as "Failed" if they are incomplete after the deadline.
* **Filtering & Sorting:** Filter tasks by status (Completed, Pending, Failed) and sort by deadline.
* **Responsive UI:** Clean dashboard interface built with HTML, CSS, and Vanilla JavaScript.

## 🛠️ Tech Stack

**Frontend:**
* HTML5
* CSS3
* JavaScript (Vanilla/ES6+)

**Backend:**
* Node.js
* Express.js
* JWT (for authentication)

**Database:**
* MongoDB (Mongoose ODM)

# Scalability Note

* Stateless Authentication: Uses JSON Web Tokens (JWT), which allows the backend to scale horizontally on any number of server instances, without managing session stickiness.

* Non-blocking I/O: Using Node.js, this allows the application to handle high concurrency and I/O-intensive operations without blocking its event loop.

* Database Scaling: MongoDB allows for vertical scaling and can be configured to use Replica Sets or Sharding to support increasing volumes of data, ensuring high availability.

## Future Optimizations
 
* Integration of Redis to cache frequently accessed task data.

* Docker containerization to ensure consistent deployment and orchestration.

* Implementation of a Load Balancer, such as Nginx to distribute traffic.