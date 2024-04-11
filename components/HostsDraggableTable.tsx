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
                    className="table w-full"
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
                            className="table-row"
                          >
                            <div className="table-cell text-center border-b font-medium p-2">
                              {h.name}
                            </div>
                            <div className="table-cell text-center border-b font-medium p-2">
                              {h.index}
                            </div>
                            <div className="table-cell border-b">
                              <Link
                                className="underline"
                                href={h.url}
                                target="_blank"
                              >
                                {h.url}
                              </Link>
                            </div>
                            <div className="table-cell border-b">
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
