package com.imc.test.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.imc.test.model.Task;

public interface TaskService {
	public boolean saveTask(Task task);

	public Task getTaskById(Long id);

	public List<Task> getAllTasks();

	public void deleteTaskById(Long id);
	
	public Map<String, Object> toMap(Task task);
	
	public Map<String, Object> toMap(String s);

	public boolean deleteAllTask();

	public List<Task> getAssignedTasks(String user);

	public Task uploadFile(Long id);

	public boolean updateAssignedTo(Long id, String user);

}
