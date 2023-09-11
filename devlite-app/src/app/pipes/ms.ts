import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'ms' })
export class MilliSecondsPipe implements PipeTransform {
  transform(value: number): string {
    if (value < 1000) {
      return `${Math.round(value)}ms`;
    } else {
      const sec = Math.floor(value / 1000);
      const remainingMs = Math.round(value % 1000);
      if (sec < 60) {
        if (remainingMs > 0) {
          return `${sec}s ${remainingMs}ms`;
        } else {
          return `${sec}s`;
        }
      } else {
        const min = Math.floor(sec / 60);
        const remainingSec = sec % 60;
        return `${min}min ${remainingSec}s`
      }
    }
  }
}