import { useCallback, useState } from "react";


type SubTask = {
  id: string;
  completed: boolean;
  name: string;
  assignedTo: string;
  feedback: boolean;
  time: string;
};

type FeedbackProps = {
  id: string;
  name: string;
  color: string;
};



const availableFeedback: FeedbackProps[] = [
  { id: "1", name: "Good", color: "bg-green-500" },
  { id: "2", name: "Average", color: "bg-orange-500" },
  { id: "3", name: "Bad", color: "bg-red-500" },
];

const useFormData = () => {
  

  //----------------------Sub Task Component data details------------------
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [assignTo, setAssignTo] = useState<string>("");
  const [taskName, setTaskName] = useState<string>("");
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackProps[]>([]);

  const handleFeedbackChange = (feedback: FeedbackProps) => {
    setSelectedFeedback(prev => {
      if (prev.some(item => item.id === feedback.id)) {
        return [];
      }
      return [feedback];
    });
  };

  // Toggle subtask completion
  const toggleSubTaskCompletion = useCallback((id: string) => {
    setSubTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  // Add new subtask
  const addSubTask = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const newSubTask: SubTask = {
      id: Date.now().toString(),
      completed: false,
      name: "",
      assignedTo: "",
      feedback: false,
      time: "1 hour",
    };
    setSubTasks(prev => [...prev, newSubTask]);
  }, []);

  // Remove subtask
  const removeSubTask = useCallback((id: string) => {
    setSubTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  

  return {
   
    subTasksData: {
      availableFeedback,
      subTasks,
      selectedFeedback,
      setSelectedFeedback,
      handleFeedbackChange,
      assignTo,
      setAssignTo,
      taskName,
      setTaskName,
      addSubTask,
      removeSubTask,
      toggleSubTaskCompletion, // Added this
    },
    
  };
};

export default useFormData;