"use client";

import { changeIndex } from "@/app/actions";
import { IGroup, IHostInfo } from "@/interfaces/types";
import Link from "next/link";
import { Fragment } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";

type Props = {
  hosts: IHostInfo[];
  groups: IGroup[];
};

const HostsDraggableTable = ({ hosts, groups }: Props) => {
  const handleDragEnd = (result: DropResult) => {
    if (result.source.index == result.destination?.index) return;
    changeIndex(result);
  };

  return (
    <div className="hosts-table">
      {groups?.map((g) => {
        const hostsByGroup = hosts
          .filter((h) => h.group_id == g.id)
          .sort((a, b) => a.index - b.index);
        return (
          <Fragment key={g.id}>
            <div className="group-row p-2">{g.name}</div>

            <DragDropContext onDragEnd={handleDragEnd}>
              <StrictModeDroppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver
                        ? "lightblue"
                        : "white",
                    }}
                  >
                    {hostsByGroup?.map((h: IHostInfo, index) => (
                      <Draggable key={h.id} draggableId={h.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            key={h.id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              background: snapshot.isDragging
                                ? "lightgreen"
                                : "white",
                              ...provided.draggableProps.style,
                            }}
                            className="flex flex-row items-center border-b p-2 gap-4"
                          >
                            <div className="font-medium w-[150px]">
                              {h.name}
                            </div>
                            <div className="w-[250px]">
                              <Link
                                className="underline"
                                href={h.url}
                                target="_blank"
                              >
                                {h.url}
                              </Link>
                            </div>
                            <div className="max-w-[200px]">
                              {h.description}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
            </DragDropContext>
            {hostsByGroup?.length == 0 && (
              <div className="col-span-3 text-center">No data</div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default HostsDraggableTable;
