import { useCallback, useState } from "react";

type TagType = {
  id: string;
  name: string;
  color: string;
};

type SubTask = {
  id: string;
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

const availableTags: TagType[] = [
  { id: "1", name: "Tag 1", color: "bg-blue-100 text-blue-800" },
  { id: "2", name: "Tag 2", color: "bg-green-100 text-green-800" },
  { id: "3", name: "Tag 3", color: "bg-purple-100 text-purple-800" },
];

const availableFeedback: FeedbackProps[] = [
  { id: "1", name: "Good", color: "bg-green-500" },
  { id: "2", name: "Average", color: "bg-orange-500" },
  { id: "3", name: "Bad", color: "bg-red-500" },
];

const useFormData = () => {
  //--------------------- DueDate Component data details------------------
  const [date, setDate] = useState<Date | undefined>();

  // Handle date selection and auto-close calendar
  const handleDateSelect = useCallback((selectedDate: Date | undefined) => {
    setDate(selectedDate);
  }, []);

  //----------------------Sub Task Component data details------------------

  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const[assignTo,setAssignTo]=useState<string>("")
  const[taskName,setTaskName]=useState<string>("")

  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackProps[]>([]);

  const handleFeedbackChange = (feedback: FeedbackProps) => {
  setSelectedFeedback(prev => {
    // If this feedback is already selected, clear selection
    if (prev.some(item => item.id === feedback.id)) {
      return [];
    }
    // Otherwise replace with new feedback
    return [feedback];
  });
};

  // Add new subtask
  const addSubTask = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    const newSubTask: SubTask = {
      id: Date.now().toString(),
      name: "",
      assignedTo: "",
      feedback: false,
      time: "1 hour",
    };
    setSubTasks((prev) => [...prev, newSubTask]);
  }, []);

  //   // Update subtask field
  //   const updateSubTask = useCallback(
  //     (id: string, field: keyof SubTask, value: string | boolean) => {
  //       setSubTasks((prev) =>
  //         prev.map((task) =>
  //           task.id === id ? { ...task, [field]: value } : task
  //         )
  //       );
  //     },
  //     []
  //   );

  // Remove subtask
  const removeSubTask = useCallback((id: string) => {
    setSubTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  // ---------------------------------Tags related data---------------------------------
  const [openTag, setOpenTag] = useState(false);

  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);

  // Handle tag selection
  const handleTagSelect = useCallback((tag: TagType) => {
    setSelectedTags((prev) => {
      // If tag is already selected, remove it
      if (prev.some((t) => t.id === tag.id)) {
        return prev.filter((t) => t.id !== tag.id);
      }
      // Otherwise add it
      return [...prev, tag];
    });
    // Don't close the popover after selection
  }, []);

  const handleRemoveTag = (tagId: number | string) => {
    setSelectedTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
  };

  return {
    dueDateData: {
      date,
      handleDateSelect,
    },

    subTasksData: {
      availableFeedback,
      subTasks,
      selectedFeedback,
       setSelectedFeedback,
      handleFeedbackChange,
      assignTo,setAssignTo,
      addSubTask,
      setTaskName,
      removeSubTask,
    },

    tagsData: {
      openTag,
      setOpenTag,
      availableTags,
      selectedTags,
      handleTagSelect,
      handleRemoveTag,
    },
  };
};

export default useFormData;
