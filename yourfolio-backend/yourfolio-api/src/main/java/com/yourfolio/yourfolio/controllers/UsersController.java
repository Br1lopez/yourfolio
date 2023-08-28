package com.yourfolio.yourfolio.controllers;

import com.yourfolio.yourfolio.dtos.ElementDTO;
import com.yourfolio.yourfolio.dtos.UserDTO;
import com.yourfolio.yourfolio.dtos.UserSaveDTO;
import com.yourfolio.yourfolio.exceptions.LoginNeededException;
import com.yourfolio.yourfolio.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("users")
@AllArgsConstructor
public class UsersController {

    private final UserService userService;
    @PostMapping("/{userId}/portfolios")
    public ResponseEntity<List<ElementDTO>> getUserPortfoliosById(@PathVariable Integer userId){
        return new ResponseEntity<>(userService.getUserPortfolios(userId), HttpStatus.OK);
    }
}
