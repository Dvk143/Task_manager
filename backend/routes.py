from flask import Blueprint, request, jsonify
from db import get_db_connection

task_routes = Blueprint("task_routes", __name__)

@task_routes.route("/tasks", methods=["GET"])
def get_tasks():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()

    cursor.close()
    conn.close()
    return jsonify(tasks)


@task_routes.route("/tasks", methods=["POST"])
def add_task():
    data = request.json
    title = data.get("title")

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("INSERT INTO tasks (title) VALUES (%s)", (title,))
    conn.commit()

    task_id = cursor.lastrowid

    cursor.close()
    conn.close()

    return jsonify({"id": task_id, "title": title}), 201


@task_routes.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM tasks WHERE id=%s", (id,))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Task deleted"})
@task_routes.route("/tasks/<int:id>", methods=["PUT"])
def update_task(id):
    data = request.json
    title = data.get("title")
    status = data.get("status")

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE tasks SET title=%s, status=%s WHERE id=%s",
        (title, status, id)
    )

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"id": id, "title": title, "status": status})

