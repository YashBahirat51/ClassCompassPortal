package com.app.service;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dao.TimetableRepository;
import com.app.dto.TimetableDTO;
import com.app.entities.Timetable;
@Service
public class TimetableService {

    @Autowired
    private TimetableRepository timetableRepository;

    public void saveTimetable(MultipartFile timetableImage, String dept, LocalDate postingDate) throws IOException {
        Timetable timetable = new Timetable();
        timetable.setDept(dept);
        timetable.setPostingDate(postingDate);
        timetable.setTimetableImage(timetableImage.getBytes());

        timetableRepository.save(timetable);
    }
    public List<TimetableDTO> getAllTimetables() {
        return timetableRepository.findAll().stream()
                .map(t -> new TimetableDTO(t.getId(), t.getDept(), t.getPostingDate().toString(),
                        Base64.getEncoder().encodeToString(t.getTimetableImage())))
                .collect(Collectors.toList());
    }

    public boolean deleteTimetableById(Long id) {
        if (timetableRepository.existsById(id)) {
            timetableRepository.deleteById(id);
            return true;
        }
        return false;
    }
    public List<Timetable> getTimetablesByDept(String dept) {
        return timetableRepository.findByDept(dept);
    }
}
