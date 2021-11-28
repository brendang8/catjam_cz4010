package com.imc.test.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.imc.test.model.Task;
import com.imc.test.service.TaskService;

@RestController
@RequestMapping("/api/task")
public class TaskController {
	
	@Autowired
	private TaskService taskService;
	
	@PostMapping("/add")
	public String addTask(@RequestBody Task Task) {
		if (taskService.saveTask(Task)) {
			return "Task ID exists";
		}
		else
			return Task.getTaskId() + " Task added";
	}
	
	@PostMapping("/{id}/upload")
	public Task uploadFile(@PathVariable Long id) {
		return taskService.uploadFile(id);
	}
	
	@GetMapping("/{id}")
	public Task getTaskById(@PathVariable Long id) {
		return taskService.getTaskById(id);
	}
	
	
	@GetMapping("/getAllTasks")
	public List<Task> getAllTasks(){
		List<Task> taskList = taskService.getAllTasks();
		for (Task task : taskList)
		{
			Map<String, Object> map = taskService.toMap(task);
			//System.out.println(Arrays.asList(map));
		}
		return taskList;
	}
	
	@GetMapping("/{user}/getAssignedTasks")
	public List<Task> getAssignedTasks(@PathVariable String user){
		List<Task> taskList = taskService.getAssignedTasks(user);
		for (Task task : taskList)
		{
			Map<String, Object> map = taskService.toMap(task);
			//System.out.println(Arrays.asList(map));
		}
		return taskList;
	}
	
	@DeleteMapping("/{id}")
	public String deleteTaskById(@PathVariable Long id) {
		taskService.deleteTaskById(id);
		return "ID of " + id + " is deleted";
	}
	
	@DeleteMapping("/deleteall")
	public String deleteAllTask() {
		if (taskService.deleteAllTask())
		return "Deleted All";
		else return "Fail to delete";
	}
}
