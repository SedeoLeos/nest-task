import TaskForm from "@/components/TaskForm"
import TaskList from "@/components/TaskList"
function DashboardPAge() {
  return (
    <div className="flex flex-row">
  <div className="basis-[28%]">
    <TaskForm />
  </div>
  <div className="basis-[72%] bg-white h-[100vh] pt-6 px-[5rem]">
    <h1 className="text-[1.875rem] font-semibold">Liste  des taches (16)</h1>
    <p className="text-[#535862] text-[1rem] pt-2">Choisissez le secteur auquel appartient votre entreprise. Cette personnalisation nous aide à vous offrir une expérience sur mesure et pertinente.</p>

    <div className="mt-5">
      <TaskList/>
    </div>

  </div>
</div>
  )
}

export default DashboardPAge