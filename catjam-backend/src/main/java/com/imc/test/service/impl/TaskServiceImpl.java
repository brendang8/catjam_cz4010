package com.imc.test.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.imc.test.model.Account;
import com.imc.test.model.Task;
import com.imc.test.repo.AccountRepo;
import com.imc.test.repo.TaskRepo;
import com.imc.test.service.TaskService;

@Service
public class TaskServiceImpl implements TaskService {
	@Autowired
	private TaskRepo taskRepo;
	@Autowired
	private AccountRepo accRepo;
	
	public boolean saveTask(Task Task) {
		if (taskRepo.existsById(Task.getTaskId())) {
			return true;
		}
		else {
			taskRepo.save(Task);
			return false;
		}
	}

	public Task getTaskById(Long id) {
		Optional<Task> optionalTask = taskRepo.findById(id);
		Task Task = optionalTask.get();
		return Task;
	}

	public List<Task> getAllTasks() {
		return (List<Task>)taskRepo.findAll();
	}

	public Map<String, Object> toMap(Task Task)
	{
		return null;
	}
	
	@Override
	public Map<String, Object> toMap(String s)
	{
		return null;
	}
	
	
	public void deleteTaskById(Long id) {
		
		taskRepo.deleteById(id);
	}

	@Override
	public boolean deleteAllTask() {
		taskRepo.deleteAll();
		return true;
	}


	
}
